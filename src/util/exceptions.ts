export class WorkoutAlreadyExistsError extends Error {
  constructor(message = "Workout already exists.") {
    super(message);
    this.name = "WorkoutAlreadyExistsError ";
  }
}
