/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProductDto {
  vendor?: VendorDto;
  productId?: string;
  productName?: string;
  description?: string | null;
  vendorId?: string;
  /** @format decimal */
  price?: number;
  /** @format int32 */
  inventory?: number;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  productTypeId?: string;
  productType?: ProductType;
}

export interface VendorDto {
  userId?: string;
  username?: string;
}

export interface ProductType {
  productTypeId?: string;
  productTypeName?: string;
  description?: string | null;
  isActive?: boolean;
}

export interface CreateProductRequestDto {
  productName?: string;
  /** @format decimal */
  price: number;
  /** @format int32 */
  inventory?: number;
  description?: string | null;
  productTypeId?: string;
  /** @minLength 1 */
  vendorId: string;
}

export interface UpdateProductRequestDto {
  productId?: string;
  productName?: string;
  description?: string | null;
  /** @format decimal */
  price?: number;
  /** @format int32 */
  inventory?: number;
  productTypeId?: string;
}

export interface ProductTypeDto {
  productTypeId?: string;
  productTypeName?: string;
  description?: string | null;
  isActive?: boolean;
}

export interface User {
  userId?: string;
  username?: string;
  email?: string;
  passwordHash?: string;
  salt?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  productsBeingSoldByVendor?: Product[];
}

export interface Product {
  productId?: string;
  productName?: string;
  description?: string | null;
  vendorId?: string;
  vendor?: User;
  /** @format decimal */
  price?: number;
  /** @format int32 */
  inventory?: number;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  productTypeId?: string;
  productType?: ProductType;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:1000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:1000
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Product
     * @name ProductCreateProduct
     * @request POST:/api/Product/CreateProduct
     */
    productCreateProduct: (
      data: CreateProductRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, any>({
        path: `/api/Product/CreateProduct`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductDeleteProduct
     * @request DELETE:/api/Product/{id}
     */
    productDeleteProduct: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Product/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductGetProduct
     * @request GET:/api/Product/{id}
     */
    productGetProduct: (id: string, params: RequestParams = {}) =>
      this.request<ProductDto, any>({
        path: `/api/Product/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductUpdateProduct
     * @request PATCH:/api/Product/UpdateProduct
     */
    productUpdateProduct: (
      data: UpdateProductRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, any>({
        path: `/api/Product/UpdateProduct`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductGetProducts
     * @request GET:/api/Product/GetProducts
     */
    productGetProducts: (
      query?: {
        /** @format int32 */
        page?: number;
        /** @format int32 */
        resultsPerPage?: number;
        productTypeId?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductDto[], any>({
        path: `/api/Product/GetProducts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductType
     * @name ProductTypeGetProductTypes
     * @request GET:/api/ProductType/GetProductTypes
     */
    productTypeGetProductTypes: (params: RequestParams = {}) =>
      this.request<ProductTypeDto[], any>({
        path: `/api/ProductType/GetProductTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserGetUsers
     * @request GET:/User/GetUsers
     */
    userGetUsers: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/User/GetUsers`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
