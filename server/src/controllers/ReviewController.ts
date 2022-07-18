import { reviewService, userService } from '../services';
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';

export async function postReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (_.isEmpty(req.body)) {
      throw new Error(
        "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
      );
    }
    const { userId, targetHospital, date, content, like } = req.body;
    const currentUserId = req.currentUserId;
    const isPermittedUser = await userService.blockUnauthorized(userId);
  
    
    if(!isPermittedUser){

        //TODO : 리다이렉션경로 재설정하기
        res.status(400).json({message: "리뷰 작성 권한이 없습니다."})

    } else if(currentUserId !== userId){

        //TODO : 리다이렉션경로 재설정하기
        res.status(400).json({message : "로그인한 사용자와 작성자가 일치하지 않습니다."});

    } else {

        const reviewInfo = { userId, targetHospital, date, content, like };
        const newReview = await reviewService.addReview(reviewInfo);
        res.status(201).json(newReview);
    }
    
    
  } catch (error) {
    next(error);
  }
}

export async function getReviewCTR (req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        if (_.isEmpty(req.body)) {
            throw new Error(
              "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
            );
          }
        
        

              
        

    } catch (error) {
        next(error)
    }

  }

  export async function updateReviewCTR (req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        if (_.isEmpty(req.body)) {
            throw new Error(
              "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
            );
          }

          
        

    } catch (error) {
        next(error)
    }

  }

  export async function deleteReviewCTR (req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        if (_.isEmpty(req.body)) {
            throw new Error(
              "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
            );
          }

          
        

    } catch (error) {
        next(error)
    }

  }

