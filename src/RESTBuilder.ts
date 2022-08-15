import axios, { Method } from "axios";

const noop = () => {}; // eslint-disable-line no-empty-function
const methods = ["get", "post", "delete", "patch", "put"];
const reflectors = [
  "toString",
  "valueOf",
  "inspect",
  "constructor",
  Symbol.toPrimitive,
  Symbol.for("nodejs.util.inspect.custom"),
];

export type RESTOptions = {
  baseURL: string;
};

export default class RESTBuilder {
  constructor(public options: RESTOptions) {}

  get api() {
    return buildRoute(this);
  }

  async request(method: Method, path: string, body: any) {
    try {
      const { status, statusText, data } = await axios.request({
        method,
        url: `${this.options.baseURL}${path}`,
        data: body,
      });
      return {
        status,
        statusText,
        data,
      };
    } catch (e: any) {
      console.log(
        `HTTPError: ${method.toUpperCase()} ${
          this.options.baseURL
        }${path} returned status code ${e.response.status} (${
          e.response.statusText
        })`
      );
    }
  }

  get endpoint() {
    return this.options.baseURL;
  }

  set endpoint(endpoint) {
    this.options.baseURL = endpoint;
  }
}
function buildRoute(manager: RESTBuilder) {
  const route = [""];
  const handler = {
    get(target: any, name: any): any {
      if (reflectors.includes(name)) return () => route.join("/");
      if (methods.includes(name)) {
        const routeBucket: any[] = [];
        for (let i = 0; i < route.length; i++) routeBucket.push(route[i]);
        return (options: any) =>
          manager.request(
            name,
            route.join("/"),
            Object.assign(
              {
                route: routeBucket.join("/"),
              },
              options
            )
          );
      }
      route.push(name);
      return new Proxy(noop, handler);
    },
    apply(target: any, _: any, args: any): any {
      route.push(...args.filter((x: any) => x != null)); // eslint-disable-line eqeqeq
      return new Proxy(noop, handler);
    },
  };
  return new Proxy(noop, handler);
}
