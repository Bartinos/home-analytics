import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeasurementService } from "../../shared/services/measurement.service";
import { measurementActions } from "./measurement.actions";
import { catchError, forkJoin, from, map, of, switchMap } from "rxjs";
import { GetMeasurementsRequest } from "../../shared/models/get-measurements-request.interface";
import { Store } from "@ngrx/store";

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
// export const fetchMeasurementsEffect = createEffect((
//   actions$ = inject(Actions),
//   measurementService = inject(MeasurementService)
// ) => {
//     return actions$.pipe(
//       ofType(measurementActions.fetchAllMeasurements),
//
//     )
//   }
// )
//
// export const fetchAllMeasurementsEffect = createEffect((
//   actions$ = inject(Actions),
//   measurementService = inject(MeasurementService),
//   store = inject(Store)
// ) => {
//   return actions$.pipe(
//     ofType(measurementActions.fetchAllMeasurements),
//     switchMap(() => {
//       // const temperatureTopic = initialMeasurementState.temperatureMeasurements.topic;
//       // const heaterTopic = initialMeasurementState.heaterMeasurements.topic;
//       // const brightnessTopic = initialMeasurementState.brightnessMeasurements.topic;
//       const temperatureRequest: GetMeasurementsRequest = {
//         topic: { country: 'netherlands', city: 'breda', building: 'home', space: 'stairs', sensor: 'temperature' },
//       };
//       const heaterRequest: GetMeasurementsRequest = {
//         topic: { country: 'netherlands', city: 'breda', building: 'home', space: 'livingroom', sensor: 'heaterRotation' },
//       };
//       const brightnessRequest: GetMeasurementsRequest = {
//         topic: { country: 'netherlands', city: 'breda', building: 'home', space: 'livingroom', sensor: 'brightness' },
//       };
//
//       // const temperatureRequest: GetMeasurementsRequest = { topic: temperatureTopic };
//       // const heaterRequest: GetMeasurementsRequest = { topic: heaterTopic };
//       // const brightnessRequest: GetMeasurementsRequest = { topic: brightnessTopic };
//
//       return forkJoin([
//         measurementService.getMeasurements(temperatureRequest),
//         measurementService.getMeasurements(heaterRequest),
//         measurementService.getMeasurements(brightnessRequest)
//       ]
//       );
//     })
//   );
// });
