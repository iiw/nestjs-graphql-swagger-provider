/* eslint-disable */
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

export interface Oficio {
  /** No de solicitud */
  solicitud?: string | null;
  /** Numero de oficio */
  _Oficio?: string | null;
  /** Fecha de recepción en formato yyyy-MM-dd */
  fechaRecepcion?: string | null;
  /** Fecha de sello en formato yyyy-MM-dd */
  fechaSello?: string | null;
  /** Usuario */
  usuario?: string | null;
}

export interface PUPartidaAnterior {
  /** BPD_INSTANCE_ID */
  solicitud?: string | null;
  /** BPD_INSTANCE_ID anterior */
  solicitudAnterior?: string | null;
}

export interface PUVoBo {
  /** LLave */
  llave?: string | null;
  /** Solicitud BPM */
  solicitud?: string | null;
  /** Contrato */
  contrato?: string | null;
  /** Anexo */
  anexo?: string | null;
  /** Nombre de partida */
  partida?: string | null;
  /** Estatus */
  estatus?: string | null;
  /** Unidad de medida */
  unidad?: string | null;
  /** Descripcion del PU */
  descripcion?: string | null;
  /** Obra */
  obra?: string | null;
  /** Falta Oficio SC */
  faltaOficioSC?: boolean;
  /** VoBo */
  voBo?: boolean;
  /** Observaciones */
  observaciones?: string | null;
  /** DocsOk */
  docsOk?: boolean;
}

export interface PUCancelacion {
  /** BPD_INSTANCE_ID */
  solicitud?: string | null;
  /** USERNAME */
  usuario?: string | null;
  /** COMMENTS */
  comentarios?: string | null;
}

export interface PU {
  /** Llave */
  llave?: string | null;
  /** Contrato */
  contrato?: string | null;
  /** Anexo */
  anexo?: string | null;
  /** Nombre de partida */
  partida?: string | null;
  /** Numero de Solicitud/Instance */
  solicitud?: string | null;
  /** Obra */
  obra?: string | null;
  /** Descripcion del PU */
  descripcion?: string | null;
  /** Unidad */
  unidad?: string | null;
  /**
   * Precio Original del PU MXN
   * @format double
   */
  precioOriginalMXN?: number | null;
  /**
   * Precio Original del PU USD
   * @format double
   */
  precioOriginalUSD?: number | null;
  /**
   * Precio Sancionado GMCIM del PU MXN
   * @format double
   */
  precioGMCIMSancionadoMXN?: number | null;
  /**
   * Precio Sancionado GMCIM del PU USD
   * @format double
   */
  precioGMCIMSancionadoUSD?: number | null;
  /**
   * Precio Sancionado DOPA del PU MXN
   * @format double
   */
  precioDOPASancionadoMXN?: number | null;
  /**
   * Precio Sancionado DOPA del PU USD
   * @format double
   */
  precioDOPASancionadoUSD?: number | null;
}

export interface PUAprobado {
  /** BPD_INSTANCE_ID */
  solicitud?: string | null;
}

export interface PUSAP {
  /** Solicitud BPM */
  solicitudBPM?: string | null;
  /** Solicitud BPM Referencia */
  solicitudBPMReferencia?: string | null;
  /** Contrato */
  contrato?: string | null;
  /** Anexo-Partida */
  anexoPartida?: string | null;
  /** Anexo */
  anexo?: string | null;
  /** Nombre de partida */
  partida?: string | null;
  /** Estatus */
  estatus?: string | null;
  /** Unidad de medida */
  unidad?: string | null;
  /** Embarcacion */
  embarcacion?: string | null;
}

export interface Contrato {
  contratoId?: string | null;
  nombre?: string | null;
}

export interface Obra {
  codigo?: string | null;
  nombre?: string | null;
}

export interface PrecioUnitarioExtraordinario {
  /** No de solicitud */
  solicitud?: string | null;
  /** No de solicitud de Cancelación */
  noSolicitudCancelacion?: string | null;
}

export interface PUReingreso {
  /** BPD_INSTANCE_ID */
  solicitud?: string | null;
  /** USERNAME */
  usuario?: string | null;
  /** COMMENTS */
  comentarios?: string | null;
}

/** Items PU */
export type PuAyudantiaCreatePayload = Oficio[] | null;

export type PuAyudantiaCreateData = any;

/** Items PU */
export type PuDopaCreatePayload = Oficio[] | null;

export type PuDopaCreateData = any;

export type PuActualizaPartidaAnteriorCreateData = any;

/** Items PU */
export type PuOperacionesCreatePayload = PUVoBo[] | null;

export type PuOperacionesCreateData = any;

/** Items PU */
export type PuEncarpetadoCreatePayload = PUVoBo[] | null;

export type PuEncarpetadoCreateData = any;

export type PuCancelaCreateData = any;

export interface PendientesDetailParams {
  /** Folio LPE */
  folioLpe: string | null;
}

export type PendientesDetailData = PU[];

export type PuObtenerPUsAutorizadosEnGestionListData = PUAprobado[];

export interface PuInterfazSapDetailParams {
  /** Fecha de creación del PU en formato yyyy-MM-dd */
  fechaCreacion: string | null;
}

export type PuInterfazSapDetailData = PUSAP[];

export interface PuVoBoObtenerPusListParams {
  solicitud?: string | null;
  contrato?: string | null;
  anexo?: string | null;
  partida?: string | null;
  obra?: string | null;
  usuario?: string | null;
  cancelado?: boolean;
}

export type PuVoBoObtenerPusListData = PUVoBo[];

export interface PuVoBoObtenerContratosListParams {
  usuario?: string | null;
}

export type PuVoBoObtenerContratosListData = Contrato[];

export interface PuVoBoObtenerObrasListParams {
  contrato?: string | null;
}

export type PuVoBoObtenerObrasListData = Obra[];

export interface PuEncarpetadoListParams {
  solicitud?: string | null;
  contrato?: string | null;
  anexo?: string | null;
  partida?: string | null;
  obra?: string | null;
}

export type PuEncarpetadoListData = PUVoBo[];

export interface PrecioUnitarioDetailParams {
  /** Contrato */
  contrato: string | null;
  /** Anexo */
  anexo: string | null;
  /** Partida */
  partida: string | null;
}

export type PrecioUnitarioDetailData = PrecioUnitarioExtraordinario;

export type PuReingresoSolicitudCreateData = any;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Cotemar Precios Unitarios API
 * @version v1.1
 * @contact Leonardo Prado Gutiérrez <lpradog@cotemar.com.mx>
 *
 * ASP.NET Core Web API de Precios Unitarios de Cotemar
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  actualiza = {
    /**
     * @description Actualiza estatus de PUs enviados a Ayudantía
     *
     * @tags actualiza
     * @name PuAyudantiaCreate
     * @summary Actualiza el número de oficio y sus fechas de envío a Ayudantía
     * @request POST:/actualiza/pu/ayudantia
     */
    puAyudantiaCreate: (
      data: PuAyudantiaCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PuAyudantiaCreateData, void>({
        path: `/actualiza/pu/ayudantia`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Actualiza estatus de PUs enviados a DOPA
     *
     * @tags actualiza
     * @name PuDopaCreate
     * @summary Actualiza el número de oficio y sus fechas de envío a DOPA
     * @request POST:/actualiza/pu/dopa
     */
    puDopaCreate: (data: PuDopaCreatePayload, params: RequestParams = {}) =>
      this.http.request<PuDopaCreateData, void>({
        path: `/actualiza/pu/dopa`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Actualiza Partida Anterior de PUEs
     *
     * @tags actualiza
     * @name PuActualizaPartidaAnteriorCreate
     * @summary Actualiza el campo partida anterior en una solicitud BPM
     * @request POST:/actualiza/pu/actualizaPartidaAnterior
     */
    puActualizaPartidaAnteriorCreate: (
      data: PUPartidaAnterior,
      params: RequestParams = {},
    ) =>
      this.http.request<PuActualizaPartidaAnteriorCreateData, void>({
        path: `/actualiza/pu/actualizaPartidaAnterior`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Actualiza VoBo de PUS
     *
     * @tags actualiza
     * @name PuOperacionesCreate
     * @summary Actualiza el campo Vobo de PUS
     * @request POST:/actualiza/pu/Operaciones
     */
    puOperacionesCreate: (
      data: PuOperacionesCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PuOperacionesCreateData, void>({
        path: `/actualiza/pu/Operaciones`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Actualiza las observaciones de PU regresados
     *
     * @tags actualiza
     * @name PuEncarpetadoCreate
     * @summary Actualiza el campo Observaciones de PU que han sido regresados
     * @request POST:/actualiza/pu/Encarpetado
     */
    puEncarpetadoCreate: (
      data: PuEncarpetadoCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PuEncarpetadoCreateData, void>({
        path: `/actualiza/pu/Encarpetado`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  cancelar = {
    /**
     * @description Actualiza estatus de PUs a cancelado
     *
     * @tags cancelar
     * @name PuCancelaCreate
     * @summary Cancela un PU mediante su solicitud
     * @request POST:/cancelar/pu/cancela
     */
    puCancelaCreate: (data: PUCancelacion, params: RequestParams = {}) =>
      this.http.request<PuCancelaCreateData, void>({
        path: `/cancelar/pu/cancela`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  consulta = {
    /**
     * @description Obtiene las PUs que no han sido gestionadas en concilia
     *
     * @tags consulta
     * @name PendientesDetail
     * @summary Devuelve la lista de PUs de un oficio de LPE que no se han gestionado
     * @request GET:/consulta/pendientes/{folioLPE}
     */
    pendientesDetail: (
      { folioLpe, ...query }: PendientesDetailParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PendientesDetailData, void>({
        path: `/consulta/pendientes/${folioLpe}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Obtener PUS autorizados en gestión
     *
     * @tags consulta
     * @name PuObtenerPUsAutorizadosEnGestionList
     * @summary Obtiene PUS autorizados que aun se encuentran en gestión en BPM
     * @request GET:/consulta/pu/obtenerPUsAutorizadosEnGestion
     */
    puObtenerPUsAutorizadosEnGestionList: (params: RequestParams = {}) =>
      this.http.request<PuObtenerPUsAutorizadosEnGestionListData, any>({
        path: `/consulta/pu/obtenerPUsAutorizadosEnGestion`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene las PUs para la interfaz SAP
     *
     * @tags consulta
     * @name PuInterfazSapDetail
     * @summary Precios Unitarios Extraordinarios para la interfaz SAP
     * @request GET:/consulta/PUInterfazSAP/{fechaCreacion}
     */
    puInterfazSapDetail: (
      { fechaCreacion, ...query }: PuInterfazSapDetailParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuInterfazSapDetailData, void>({
        path: `/consulta/PUInterfazSAP/${fechaCreacion}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene las PUs para VoBo
     *
     * @tags consulta
     * @name PuVoBoObtenerPusList
     * @summary Precios Unitarios para visto bueno
     * @request GET:/consulta/PUVoBo/ObtenerPUS
     */
    puVoBoObtenerPusList: (
      query: PuVoBoObtenerPusListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuVoBoObtenerPusListData, void>({
        path: `/consulta/PUVoBo/ObtenerPUS`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene los contratos vigentes
     *
     * @tags consulta
     * @name PuVoBoObtenerContratosList
     * @summary Contratos Vigentes
     * @request GET:/consulta/PUVoBo/ObtenerContratos
     */
    puVoBoObtenerContratosList: (
      query: PuVoBoObtenerContratosListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuVoBoObtenerContratosListData, void>({
        path: `/consulta/PUVoBo/ObtenerContratos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene las obras vigentes
     *
     * @tags consulta
     * @name PuVoBoObtenerObrasList
     * @summary Obras Vigentes
     * @request GET:/consulta/PUVoBo/ObtenerObras
     */
    puVoBoObtenerObrasList: (
      query: PuVoBoObtenerObrasListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuVoBoObtenerObrasListData, void>({
        path: `/consulta/PUVoBo/ObtenerObras`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene las PUs para encarpetador
     *
     * @tags consulta
     * @name PuEncarpetadoList
     * @summary Precios Unitarios para encarpetador
     * @request GET:/consulta/PUEncarpetado
     */
    puEncarpetadoList: (
      query: PuEncarpetadoListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PuEncarpetadoListData, void>({
        path: `/consulta/PUEncarpetado`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  precioUnitario = {
    /**
     * @description Obtiene las PUs que no han sido gestionadas en concilia
     *
     * @tags PrecioUnitario
     * @name PrecioUnitarioDetail
     * @summary Devuelve el número de solicitud y su el número de su solicitud cancelada si tiene
     * @request GET:/PrecioUnitario/{contrato}/{anexo}/{partida}
     */
    precioUnitarioDetail: (
      { contrato, anexo, partida, ...query }: PrecioUnitarioDetailParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PrecioUnitarioDetailData, void>({
        path: `/PrecioUnitario/${contrato}/${anexo}/${partida}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  reingreso = {
    /**
     * @description Actualiza estatus de PUs a reingreso
     *
     * @tags reingreso
     * @name PuReingresoSolicitudCreate
     * @summary Cancela un Precio Unitario meiante su No de solicitud
     * @request POST:/reingreso/pu/reingresoSolicitud
     */
    puReingresoSolicitudCreate: (
      data: PUReingreso,
      params: RequestParams = {},
    ) =>
      this.http.request<PuReingresoSolicitudCreateData, void>({
        path: `/reingreso/pu/reingresoSolicitud`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
