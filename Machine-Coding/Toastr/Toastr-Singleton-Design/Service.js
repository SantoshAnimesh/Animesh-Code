
class Service {
  services = [];

  subscribe(callback) {
    this.services.push(callback);

    return () => {
      this.services = this.services.filter((s) => s !== this.services);
    };
  }

  action(type, msg) {
    this.services.forEach((callbackService) => callbackService(type, msg));
  }

  success(msg) {
    this.action("success", msg);
  }

  error(msg) {
    this.action("error", msg);
  }

  info(msg) {
    this.action("info", msg);
  }
}

export const service = new Service();
