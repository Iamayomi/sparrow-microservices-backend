import { Request, Response } from "express";
import { StatusCodes as status } from "http-status-codes";

// import logger from "../utils/logger";
import { CustomRequest } from "../types";
import { AuthService, authService } from "../services";
import { Auth, IAuthModel } from "../models";

class AuthController {
  protected service: AuthService;
  protected model: IAuthModel;

  constructor() {
    this.service = authService;
    this.model = Auth;
  }

  /**
   * @route {POST} /api/v1/register
   * @access public */
  public register = async (req: CustomRequest, res: Response) => {
    const user = await this.service.createAccount(req.body);

    res.status(status.CREATED).json({
      success: true,
      message: `Booyah! email has been sent`,
      data: { user },
    });
  };
}

/** Auth route handlers */
export const controller = new AuthController();
