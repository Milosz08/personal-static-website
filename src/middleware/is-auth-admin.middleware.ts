/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Request, Response } from 'express';
import { ADMIN } from '../utils/constants';

export default function isAuthAdminMiddleware(
  req: Request,
  res: Response,
  next: CallableFunction
) {
  const user = req.session.loggedUser;
  if (!user) {
    res.redirect('/login');
    return;
  }
  if (user.isFirstLogin && !req.url.includes('first-login')) {
    res.redirect('/first-login');
    return;
  }
  if (user.role !== ADMIN) {
    res.redirect('/cms/projects');
    return;
  }
  next();
}
