// import * as url from "url";
// import * as _ from "lodash";
// import { IOptionsUri } from "@interfaces";
// import { Url, UrlObject } from "url";
import * as cookie from "cookie";

// merge 'options' into 'redirectUri' (as query string)
export const setCookies = (res, id_token, access_token) => {
    // https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
    // all details are summarized here: http://disq.us/p/16qo82e
    const milliseconds = 1000 * 60 * 60 * 24 * 365;  // (1000 = 1 sec) http://stackoverflow.com/a/9718416/2726725

    const isSecure = process.env.NODE_ENV === "production"; // in production the cookie is sent only over https

    // "secure" flag == true => this cookie will only be sent over an HTTPS connection
    // "httpOnly" flag == true => JavaScript will not be able to read this authentication cookie
    // "httpOnly" is used to prevent XSS (Cross-Site Scripting)
    const c0 = cookie.serialize("id_token", id_token, { path: "/", maxAge: milliseconds, httpOnly: true, secure: isSecure });
    const c1 = cookie.serialize("access_token", access_token, { path: "/", maxAge: milliseconds, httpOnly: true, secure: isSecure });

    console.log("aaa");
    // 'XSRF-TOKEN' is the default name in Angular for CSRF token
    // 'XSRF-TOKEN' is used to prevent CSRF (Cross-Site Request Forgery)
    // const c2 = cookie.serialize("XSRF-TOKEN", access_token, { path: "/", maxAge: milliseconds });

    // only for client
    // const c3 = cookie.serialize("user", JSON.stringify(userProfile), { path: "/", maxAge: milliseconds });

    // http://www.connecto.io/blog/nodejs-express-how-to-set-multiple-cookies-in-the-same-response-object/
    res.header("Set-Cookie", [c0, c1]); // array of cookies http://expressjs.com/api.html#res.set
    // res.setHeader("Set-Cookie", c0);
};

export const getCookie = (req, name) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[name];
};
