import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeasurementService } from "../../shared/services/measurement.service";
import { measurementActions } from "./measurement.actions";
import { catchError, forkJoin, from, map, of, switchMap } from "rxjs";

export const fetchTemperatureMeasurementsEffect = createEffect((
  actions$ = inject(Actions),
  measurementService = inject(MeasurementService)
) => {
  return actions$.pipe(
    ofType(measurementActions.fetchTemperatureMeasurements),
    switchMap(({ request }) => from(measurementService.getMeasurements(request).pipe(
      map((measurements) => measurementActions.fetchTemperatureMeasurementsSuccess({ measurements: measurements }
      )),
      catchError((error) => of(measurementActions.fetchTemperatureMeasurementsFailure()))
    )))
  )
},
  {
    functional: true
  }
)

export const fetchHeaterMeasurementsEffect = createEffect((
  actions$ = inject(Actions),
  measurementService = inject(MeasurementService)
) => {
  return actions$.pipe(
    ofType(measurementActions.fetchHeaterMeasurements),
    switchMap(({ request }) => from(measurementService.getMeasurements(request).pipe(
      map((measurements) => measurementActions.fetchHeaterMeasurementsSuccess({ measurements: measurements }
      )),
      catchError((error) => of(measurementActions.fetchHeaterMeasurementsFailure()))
    )))
  )
},
  {
    functional: true
  }
)

export const fetchBrightnessMeasurementsEffect = createEffect((
  actions$ = inject(Actions),
  measurementService = inject(MeasurementService)
) => {
  return actions$.pipe(
    ofType(measurementActions.fetchBrightnessMeasurements),
    switchMap(({ request }) => from(measurementService.getMeasurements(request).pipe(
      map((measurements) => measurementActions.fetchBrightnessMeasurementsSuccess({ measurements: measurements }
      )),
      catchError((error) => of(measurementActions.fetchBrightnessMeasurementsFailure()))
    )))
  )
},
  {
    functional: true
  }
)
