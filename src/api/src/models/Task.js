export class Task {

  constructor({
    id,
    description,
    projectId,
    done,
    terminationDate,
  }) {
    this.id = id;
    this.description = description;
    this.projectId = projectId;
    this.done = done;
    this.terminationDate = terminationDate;
  }

}