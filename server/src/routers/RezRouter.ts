import { Router } from 'express';
import * as _ from 'lodash';
import {
  reservationService,
  hospitalService,
  userService,
  petService,
  rezStatusService,
} from '../services';
import {
  adminOnly,
  HospLoginRequired,
  onlyHospOwner,
  loginRequired,
  HttpError,
} from '../middlewares';
import {
  hospServiceModel,
  ReservationInfo,
  ReservationRegisterData,
} from '../db';
import mongoose, { model } from 'mongoose';

const reservationRouter = Router();

reservationRouter.post('/register', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { hospName, service, price, pet, rezDate, rezHour } = req.body;

    const userId = new mongoose.Types.ObjectId(req.currentUserId);

    const hospitalInfo = await hospitalService.findHospitalByName(hospName);

    const hospitalId = hospitalInfo._id;

    const rezRegisterData: ReservationRegisterData = {
      customer: userId,
      hospital: hospitalId,
      service: service,
      price: price,
      pet: pet,
      rezDate: rezDate,
      rezHour: rezHour,
    };

    const newReservation = await reservationService.create(rezRegisterData);

    res.status(200).json({
      data: {
        newReservation,
      },
      message: '예약하셨습니다.',
    });
  } catch (error) {
    next(error);
  }
});

reservationRouter.get('/user/list', loginRequired, async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const userId = req.currentUserId;

    const userInfo = await userService.getUserData(userId);

    const searchOptions = { customer: userId };

    const totalReservations = await reservationService.countTotalReservations(
      searchOptions
    );

    const Reservations = await reservationService.getReservations(
      page,
      perPage,
      searchOptions
    );

    const hospIds = Reservations.map((data) => data.hospital.toString());
    const petIds = Reservations.map((data) => data.pet.toString());
    const rezStatuses = Reservations.map((data) => data.rezStatus.toString());
    console.log(petIds);

    const hospInfoes = await hospitalService.findByIds(hospIds);
    const petInfoes = await petService.findByIds(petIds);
    const rezStatusInfoes = await rezStatusService.findByIds(rezStatuses);

    const totalPage = Math.ceil(totalReservations / perPage);

    res.status(200).json({
      data: {
        searchOptions: searchOptions,
        ReservationsInfo: {
          Reservations: Reservations,
          hospInfoes: hospInfoes,
          petInfoes: petInfoes,
          rezStatusInfoes: rezStatusInfoes,
        },
        page: page,
        perPage: perPage,
        totalPage: totalPage,
        totalHospitals: totalReservations,
      },
      message: '',
    });
  } catch (error) {
    next(error);
  }
});

reservationRouter.get(
  '/hospital/list',
  HospLoginRequired,
  async (req, res, next) => {
    try {
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 10);

      const hospId = req.currentHospId;

      const searchOptions = { hospital: hospId };

      const totalReservations = await reservationService.countTotalReservations(
        searchOptions
      );

      const Reservations = await reservationService.getReservations(
        page,
        perPage,
        searchOptions
      );

      const customerIds = Reservations.map((data) => data.customer.toString());
      const petIds = Reservations.map((data) => data.pet.toString());
      const rezStatuses = Reservations.map((data) => data.rezStatus.toString());
      console.log(petIds);
      const customerInfoes = await userService.findByIds(customerIds);
      const petInfoes = await petService.findByIds(petIds);
      const rezStatusInfoes = await rezStatusService.findByIds(rezStatuses);

      const totalPage = Math.ceil(totalReservations / perPage);

      res.status(200).json({
        data: {
          searchOptions: searchOptions,
          ReservationsInfo: {
            Reservations: Reservations,
            customerInfoes: customerInfoes,
            petInfoes: petInfoes,
            rezStatusInfoes: rezStatusInfoes,
          },
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          totalHospitals: totalReservations,
        },
        message: '',
      });
    } catch (error) {
      next(error);
    }
  }
);

reservationRouter.get('/admin/list', adminOnly, async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const searchOptions = {};

    const totalReservations = await reservationService.countTotalReservations(
      searchOptions
    );

    const Reservations = await reservationService.getReservations(
      page,
      perPage,
      searchOptions
    );

    const hospitalIds = Reservations.map((data) => data.hospital.toString());
    const customerIds = Reservations.map((data) => data.customer.toString());
    const petIds = Reservations.map((data) => data.pet.toString());
    const rezStatuses = Reservations.map((data) => data.rezStatus.toString());

    const hospitalInfoes = await hospitalService.findByIds(hospitalIds);
    const customerInfoes = await userService.findByIds(customerIds);
    const petInfoes = await petService.findByIds(petIds);
    const rezStatusInfoes = await rezStatusService.findByIds(rezStatuses);

    const totalPage = Math.ceil(totalReservations / perPage);

    res.status(200).json({
      data: {
        searchOptions: searchOptions,
        ReservationsInfo: {
          Reservations: Reservations,
          hospitalInfoes: hospitalInfoes,
          customerInfoes: customerInfoes,
          petInfoes: petInfoes,
          rezStatusInfoes: rezStatusInfoes,
        },
        page: page,
        perPage: perPage,
        totalPage: totalPage,
        totalHospitals: totalReservations,
      },
      message: '',
    });
  } catch (error) {
    next(error);
  }
});

reservationRouter.patch(
  '/user/:reservationId',
  loginRequired,
  async (req, res, next) => {
    try {
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      const { reservationId } = req.params;
      const { rezStatusId, customerId } = req.body;
      const userId = req.currentUserId;

      if (customerId !== userId) {
        throw new HttpError(
          403,
          '로그인된 유저는 요청할 수 있는 권한이 없습니다.'
        );
      }

      const updateReservation = await reservationService.update({
        reservationId,
        update: { rezStatus: rezStatusId },
      });
      res.status(201).json({ updateReservation, message: '수정되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

reservationRouter.patch(
  '/:hospitalName/:reservationId',
  HospLoginRequired,
  onlyHospOwner,
  async (req, res, next) => {
    try {
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      const { reservationId } = req.params;
      const { rezStatusId } = req.body;

      const updateReservation = await reservationService.update({
        reservationId,
        update: { rezStatus: rezStatusId },
      });
      res.status(201).json({ updateReservation, message: '수정되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

reservationRouter.get(
  '/:hospitalName/:rezDate/:rezHour',
  async (req, res, next) => {
    try {
      const { hospitalName, rezDate, rezHour } = req.params;

      const hosiptal = await hospitalService.findHospitalByName(hospitalName);
      const hospitalId = hosiptal._id.toString();

      const reservations = await reservationService.findbyNameAndDate(
        hospitalId,
        rezDate,
        parseInt(rezHour)
      );
      res
        .status(201)
        .json({ data: { reservations }, message: '수정되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

export { reservationRouter };
