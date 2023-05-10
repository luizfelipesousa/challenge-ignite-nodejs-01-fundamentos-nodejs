export function buildRoutePath(path) {

    const routeParameterRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParameterRegex, '(?<$1>[a-z0-9\-_]+)')

    const regex = new RegExp(`^${pathWithParams}(\\?(.*))?$`);

    return regex;
}