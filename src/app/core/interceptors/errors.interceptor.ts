import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService);
  // to catch response i use pipe
  return next(req).pipe(
    // to catch error from response use catcherror
    catchError((err) => {
      _ToastrService.error(err.error.message, '', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
      });

      // beacuse the return need observal to return . so use throwerror bc returned observal
      return throwError(() => err);
    }),
  );
};
