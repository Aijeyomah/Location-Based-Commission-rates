import { vendorOrderSubmission } from '../services/vendor-order-submission';
import { Request, Response, NextFunction } from 'express';
import { Helper, constants , ApiError} from 'utils';



const { successResponse } = Helper;
const { FAILED_VENDOR_ORDER, SUBMITTED_VENDOR_ORDER} = constants;

export const orderSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await vendorOrderSubmission(req.body)
    successResponse(res, { data, message: SUBMITTED_VENDOR_ORDER  });
  } catch (err) {
    next(new ApiError({ message: FAILED_VENDOR_ORDER }));
  }
};
