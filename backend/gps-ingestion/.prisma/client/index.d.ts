
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vessel
 * 
 */
export type Vessel = $Result.DefaultSelection<Prisma.$VesselPayload>
/**
 * Model Trip
 * 
 */
export type Trip = $Result.DefaultSelection<Prisma.$TripPayload>
/**
 * Model LocationPoint
 * 
 */
export type LocationPoint = $Result.DefaultSelection<Prisma.$LocationPointPayload>
/**
 * Model Zone
 * 
 */
export type Zone = $Result.DefaultSelection<Prisma.$ZonePayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model TripStatusHistory
 * 
 */
export type TripStatusHistory = $Result.DefaultSelection<Prisma.$TripStatusHistoryPayload>
/**
 * Model GpsLog
 * 
 */
export type GpsLog = $Result.DefaultSelection<Prisma.$GpsLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VesselType: {
  CARGO: 'CARGO',
  TANKER: 'TANKER',
  PASSENGER: 'PASSENGER',
  FISHING: 'FISHING',
  TUG: 'TUG',
  RECREATIONAL: 'RECREATIONAL',
  OTHER: 'OTHER'
};

export type VesselType = (typeof VesselType)[keyof typeof VesselType]


export const TripStatus: {
  PLANNED: 'PLANNED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TripStatus = (typeof TripStatus)[keyof typeof TripStatus]


export const AlertSeverity: {
  INFO: 'INFO',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]


export const AlertStatus: {
  ACTIVE: 'ACTIVE',
  RESOLVED: 'RESOLVED',
  ACKNOWLEDGED: 'ACKNOWLEDGED'
};

export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus]

}

export type VesselType = $Enums.VesselType

export const VesselType: typeof $Enums.VesselType

export type TripStatus = $Enums.TripStatus

export const TripStatus: typeof $Enums.TripStatus

export type AlertSeverity = $Enums.AlertSeverity

export const AlertSeverity: typeof $Enums.AlertSeverity

export type AlertStatus = $Enums.AlertStatus

export const AlertStatus: typeof $Enums.AlertStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Roles
 * const roles = await prisma.role.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Roles
   * const roles = await prisma.role.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vessel`: Exposes CRUD operations for the **Vessel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vessels
    * const vessels = await prisma.vessel.findMany()
    * ```
    */
  get vessel(): Prisma.VesselDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trip`: Exposes CRUD operations for the **Trip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trip.findMany()
    * ```
    */
  get trip(): Prisma.TripDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locationPoint`: Exposes CRUD operations for the **LocationPoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocationPoints
    * const locationPoints = await prisma.locationPoint.findMany()
    * ```
    */
  get locationPoint(): Prisma.LocationPointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.zone`: Exposes CRUD operations for the **Zone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Zones
    * const zones = await prisma.zone.findMany()
    * ```
    */
  get zone(): Prisma.ZoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tripStatusHistory`: Exposes CRUD operations for the **TripStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TripStatusHistories
    * const tripStatusHistories = await prisma.tripStatusHistory.findMany()
    * ```
    */
  get tripStatusHistory(): Prisma.TripStatusHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gpsLog`: Exposes CRUD operations for the **GpsLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GpsLogs
    * const gpsLogs = await prisma.gpsLog.findMany()
    * ```
    */
  get gpsLog(): Prisma.GpsLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Role: 'Role',
    User: 'User',
    Vessel: 'Vessel',
    Trip: 'Trip',
    LocationPoint: 'LocationPoint',
    Zone: 'Zone',
    Alert: 'Alert',
    TripStatusHistory: 'TripStatusHistory',
    GpsLog: 'GpsLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "role" | "user" | "vessel" | "trip" | "locationPoint" | "zone" | "alert" | "tripStatusHistory" | "gpsLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vessel: {
        payload: Prisma.$VesselPayload<ExtArgs>
        fields: Prisma.VesselFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VesselFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VesselFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          findFirst: {
            args: Prisma.VesselFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VesselFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          findMany: {
            args: Prisma.VesselFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>[]
          }
          create: {
            args: Prisma.VesselCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          createMany: {
            args: Prisma.VesselCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VesselCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>[]
          }
          delete: {
            args: Prisma.VesselDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          update: {
            args: Prisma.VesselUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          deleteMany: {
            args: Prisma.VesselDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VesselUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VesselUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>[]
          }
          upsert: {
            args: Prisma.VesselUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VesselPayload>
          }
          aggregate: {
            args: Prisma.VesselAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVessel>
          }
          groupBy: {
            args: Prisma.VesselGroupByArgs<ExtArgs>
            result: $Utils.Optional<VesselGroupByOutputType>[]
          }
          count: {
            args: Prisma.VesselCountArgs<ExtArgs>
            result: $Utils.Optional<VesselCountAggregateOutputType> | number
          }
        }
      }
      Trip: {
        payload: Prisma.$TripPayload<ExtArgs>
        fields: Prisma.TripFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TripFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TripFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findFirst: {
            args: Prisma.TripFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TripFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findMany: {
            args: Prisma.TripFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          create: {
            args: Prisma.TripCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          createMany: {
            args: Prisma.TripCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TripCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          delete: {
            args: Prisma.TripDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          update: {
            args: Prisma.TripUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          deleteMany: {
            args: Prisma.TripDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TripUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TripUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          upsert: {
            args: Prisma.TripUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          aggregate: {
            args: Prisma.TripAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrip>
          }
          groupBy: {
            args: Prisma.TripGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripGroupByOutputType>[]
          }
          count: {
            args: Prisma.TripCountArgs<ExtArgs>
            result: $Utils.Optional<TripCountAggregateOutputType> | number
          }
        }
      }
      LocationPoint: {
        payload: Prisma.$LocationPointPayload<ExtArgs>
        fields: Prisma.LocationPointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationPointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationPointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          findFirst: {
            args: Prisma.LocationPointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationPointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          findMany: {
            args: Prisma.LocationPointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>[]
          }
          create: {
            args: Prisma.LocationPointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          createMany: {
            args: Prisma.LocationPointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationPointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>[]
          }
          delete: {
            args: Prisma.LocationPointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          update: {
            args: Prisma.LocationPointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          deleteMany: {
            args: Prisma.LocationPointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationPointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationPointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>[]
          }
          upsert: {
            args: Prisma.LocationPointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPointPayload>
          }
          aggregate: {
            args: Prisma.LocationPointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocationPoint>
          }
          groupBy: {
            args: Prisma.LocationPointGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationPointGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationPointCountArgs<ExtArgs>
            result: $Utils.Optional<LocationPointCountAggregateOutputType> | number
          }
        }
      }
      Zone: {
        payload: Prisma.$ZonePayload<ExtArgs>
        fields: Prisma.ZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          findFirst: {
            args: Prisma.ZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          findMany: {
            args: Prisma.ZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>[]
          }
          delete: {
            args: Prisma.ZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          update: {
            args: Prisma.ZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          deleteMany: {
            args: Prisma.ZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ZoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>[]
          }
          aggregate: {
            args: Prisma.ZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateZone>
          }
          groupBy: {
            args: Prisma.ZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<ZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.ZoneCountArgs<ExtArgs>
            result: $Utils.Optional<ZoneCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      TripStatusHistory: {
        payload: Prisma.$TripStatusHistoryPayload<ExtArgs>
        fields: Prisma.TripStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TripStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TripStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.TripStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TripStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.TripStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.TripStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.TripStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TripStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.TripStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          update: {
            args: Prisma.TripStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.TripStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TripStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TripStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.TripStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.TripStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTripStatusHistory>
          }
          groupBy: {
            args: Prisma.TripStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TripStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<TripStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      GpsLog: {
        payload: Prisma.$GpsLogPayload<ExtArgs>
        fields: Prisma.GpsLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GpsLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GpsLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          findFirst: {
            args: Prisma.GpsLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GpsLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          findMany: {
            args: Prisma.GpsLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>[]
          }
          create: {
            args: Prisma.GpsLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          createMany: {
            args: Prisma.GpsLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GpsLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>[]
          }
          delete: {
            args: Prisma.GpsLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          update: {
            args: Prisma.GpsLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          deleteMany: {
            args: Prisma.GpsLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GpsLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GpsLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>[]
          }
          upsert: {
            args: Prisma.GpsLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GpsLogPayload>
          }
          aggregate: {
            args: Prisma.GpsLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGpsLog>
          }
          groupBy: {
            args: Prisma.GpsLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<GpsLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.GpsLogCountArgs<ExtArgs>
            result: $Utils.Optional<GpsLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    role?: RoleOmit
    user?: UserOmit
    vessel?: VesselOmit
    trip?: TripOmit
    locationPoint?: LocationPointOmit
    zone?: ZoneOmit
    alert?: AlertOmit
    tripStatusHistory?: TripStatusHistoryOmit
    gpsLog?: GpsLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    statusChanges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusChanges?: boolean | UserCountOutputTypeCountStatusChangesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripStatusHistoryWhereInput
  }


  /**
   * Count Type VesselCountOutputType
   */

  export type VesselCountOutputType = {
    trips: number
    alerts: number
    gpsLogs: number
  }

  export type VesselCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | VesselCountOutputTypeCountTripsArgs
    alerts?: boolean | VesselCountOutputTypeCountAlertsArgs
    gpsLogs?: boolean | VesselCountOutputTypeCountGpsLogsArgs
  }

  // Custom InputTypes
  /**
   * VesselCountOutputType without action
   */
  export type VesselCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VesselCountOutputType
     */
    select?: VesselCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VesselCountOutputType without action
   */
  export type VesselCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
  }

  /**
   * VesselCountOutputType without action
   */
  export type VesselCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }

  /**
   * VesselCountOutputType without action
   */
  export type VesselCountOutputTypeCountGpsLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GpsLogWhereInput
  }


  /**
   * Count Type TripCountOutputType
   */

  export type TripCountOutputType = {
    points: number
    alerts: number
    history: number
  }

  export type TripCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    points?: boolean | TripCountOutputTypeCountPointsArgs
    alerts?: boolean | TripCountOutputTypeCountAlertsArgs
    history?: boolean | TripCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     */
    select?: TripCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountPointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationPointWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripStatusHistoryWhereInput
  }


  /**
   * Count Type ZoneCountOutputType
   */

  export type ZoneCountOutputType = {
    alerts: number
  }

  export type ZoneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | ZoneCountOutputTypeCountAlertsArgs
  }

  // Custom InputTypes
  /**
   * ZoneCountOutputType without action
   */
  export type ZoneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZoneCountOutputType
     */
    select?: ZoneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ZoneCountOutputType without action
   */
  export type ZoneCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    roleId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    roleId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    roleId: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    roleId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    roleId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    roleId?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    roleId: string
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    roleId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    roleId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    roleId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    roleId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "roleId" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      statusChanges: Prisma.$TripStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string | null
      lastName: string | null
      roleId: string
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    statusChanges<T extends User$statusChangesArgs<ExtArgs> = {}>(args?: Subset<T, User$statusChangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly roleId: FieldRef<"User", 'String'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.statusChanges
   */
  export type User$statusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    where?: TripStatusHistoryWhereInput
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    cursor?: TripStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripStatusHistoryScalarFieldEnum | TripStatusHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Vessel
   */

  export type AggregateVessel = {
    _count: VesselCountAggregateOutputType | null
    _min: VesselMinAggregateOutputType | null
    _max: VesselMaxAggregateOutputType | null
  }

  export type VesselMinAggregateOutputType = {
    id: string | null
    name: string | null
    imo: string | null
    mmsi: string | null
    type: $Enums.VesselType | null
    flag: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VesselMaxAggregateOutputType = {
    id: string | null
    name: string | null
    imo: string | null
    mmsi: string | null
    type: $Enums.VesselType | null
    flag: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VesselCountAggregateOutputType = {
    id: number
    name: number
    imo: number
    mmsi: number
    type: number
    flag: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VesselMinAggregateInputType = {
    id?: true
    name?: true
    imo?: true
    mmsi?: true
    type?: true
    flag?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VesselMaxAggregateInputType = {
    id?: true
    name?: true
    imo?: true
    mmsi?: true
    type?: true
    flag?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VesselCountAggregateInputType = {
    id?: true
    name?: true
    imo?: true
    mmsi?: true
    type?: true
    flag?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VesselAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vessel to aggregate.
     */
    where?: VesselWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vessels to fetch.
     */
    orderBy?: VesselOrderByWithRelationInput | VesselOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VesselWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vessels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vessels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vessels
    **/
    _count?: true | VesselCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VesselMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VesselMaxAggregateInputType
  }

  export type GetVesselAggregateType<T extends VesselAggregateArgs> = {
        [P in keyof T & keyof AggregateVessel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVessel[P]>
      : GetScalarType<T[P], AggregateVessel[P]>
  }




  export type VesselGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VesselWhereInput
    orderBy?: VesselOrderByWithAggregationInput | VesselOrderByWithAggregationInput[]
    by: VesselScalarFieldEnum[] | VesselScalarFieldEnum
    having?: VesselScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VesselCountAggregateInputType | true
    _min?: VesselMinAggregateInputType
    _max?: VesselMaxAggregateInputType
  }

  export type VesselGroupByOutputType = {
    id: string
    name: string
    imo: string
    mmsi: string
    type: $Enums.VesselType
    flag: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: VesselCountAggregateOutputType | null
    _min: VesselMinAggregateOutputType | null
    _max: VesselMaxAggregateOutputType | null
  }

  type GetVesselGroupByPayload<T extends VesselGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VesselGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VesselGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VesselGroupByOutputType[P]>
            : GetScalarType<T[P], VesselGroupByOutputType[P]>
        }
      >
    >


  export type VesselSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imo?: boolean
    mmsi?: boolean
    type?: boolean
    flag?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trips?: boolean | Vessel$tripsArgs<ExtArgs>
    alerts?: boolean | Vessel$alertsArgs<ExtArgs>
    gpsLogs?: boolean | Vessel$gpsLogsArgs<ExtArgs>
    _count?: boolean | VesselCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vessel"]>

  export type VesselSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imo?: boolean
    mmsi?: boolean
    type?: boolean
    flag?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vessel"]>

  export type VesselSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imo?: boolean
    mmsi?: boolean
    type?: boolean
    flag?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vessel"]>

  export type VesselSelectScalar = {
    id?: boolean
    name?: boolean
    imo?: boolean
    mmsi?: boolean
    type?: boolean
    flag?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VesselOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "imo" | "mmsi" | "type" | "flag" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["vessel"]>
  export type VesselInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | Vessel$tripsArgs<ExtArgs>
    alerts?: boolean | Vessel$alertsArgs<ExtArgs>
    gpsLogs?: boolean | Vessel$gpsLogsArgs<ExtArgs>
    _count?: boolean | VesselCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VesselIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VesselIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VesselPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vessel"
    objects: {
      trips: Prisma.$TripPayload<ExtArgs>[]
      alerts: Prisma.$AlertPayload<ExtArgs>[]
      gpsLogs: Prisma.$GpsLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      imo: string
      mmsi: string
      type: $Enums.VesselType
      flag: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vessel"]>
    composites: {}
  }

  type VesselGetPayload<S extends boolean | null | undefined | VesselDefaultArgs> = $Result.GetResult<Prisma.$VesselPayload, S>

  type VesselCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VesselFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VesselCountAggregateInputType | true
    }

  export interface VesselDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vessel'], meta: { name: 'Vessel' } }
    /**
     * Find zero or one Vessel that matches the filter.
     * @param {VesselFindUniqueArgs} args - Arguments to find a Vessel
     * @example
     * // Get one Vessel
     * const vessel = await prisma.vessel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VesselFindUniqueArgs>(args: SelectSubset<T, VesselFindUniqueArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vessel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VesselFindUniqueOrThrowArgs} args - Arguments to find a Vessel
     * @example
     * // Get one Vessel
     * const vessel = await prisma.vessel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VesselFindUniqueOrThrowArgs>(args: SelectSubset<T, VesselFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vessel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselFindFirstArgs} args - Arguments to find a Vessel
     * @example
     * // Get one Vessel
     * const vessel = await prisma.vessel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VesselFindFirstArgs>(args?: SelectSubset<T, VesselFindFirstArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vessel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselFindFirstOrThrowArgs} args - Arguments to find a Vessel
     * @example
     * // Get one Vessel
     * const vessel = await prisma.vessel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VesselFindFirstOrThrowArgs>(args?: SelectSubset<T, VesselFindFirstOrThrowArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vessels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vessels
     * const vessels = await prisma.vessel.findMany()
     * 
     * // Get first 10 Vessels
     * const vessels = await prisma.vessel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vesselWithIdOnly = await prisma.vessel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VesselFindManyArgs>(args?: SelectSubset<T, VesselFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vessel.
     * @param {VesselCreateArgs} args - Arguments to create a Vessel.
     * @example
     * // Create one Vessel
     * const Vessel = await prisma.vessel.create({
     *   data: {
     *     // ... data to create a Vessel
     *   }
     * })
     * 
     */
    create<T extends VesselCreateArgs>(args: SelectSubset<T, VesselCreateArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vessels.
     * @param {VesselCreateManyArgs} args - Arguments to create many Vessels.
     * @example
     * // Create many Vessels
     * const vessel = await prisma.vessel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VesselCreateManyArgs>(args?: SelectSubset<T, VesselCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vessels and returns the data saved in the database.
     * @param {VesselCreateManyAndReturnArgs} args - Arguments to create many Vessels.
     * @example
     * // Create many Vessels
     * const vessel = await prisma.vessel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vessels and only return the `id`
     * const vesselWithIdOnly = await prisma.vessel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VesselCreateManyAndReturnArgs>(args?: SelectSubset<T, VesselCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vessel.
     * @param {VesselDeleteArgs} args - Arguments to delete one Vessel.
     * @example
     * // Delete one Vessel
     * const Vessel = await prisma.vessel.delete({
     *   where: {
     *     // ... filter to delete one Vessel
     *   }
     * })
     * 
     */
    delete<T extends VesselDeleteArgs>(args: SelectSubset<T, VesselDeleteArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vessel.
     * @param {VesselUpdateArgs} args - Arguments to update one Vessel.
     * @example
     * // Update one Vessel
     * const vessel = await prisma.vessel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VesselUpdateArgs>(args: SelectSubset<T, VesselUpdateArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vessels.
     * @param {VesselDeleteManyArgs} args - Arguments to filter Vessels to delete.
     * @example
     * // Delete a few Vessels
     * const { count } = await prisma.vessel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VesselDeleteManyArgs>(args?: SelectSubset<T, VesselDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vessels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vessels
     * const vessel = await prisma.vessel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VesselUpdateManyArgs>(args: SelectSubset<T, VesselUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vessels and returns the data updated in the database.
     * @param {VesselUpdateManyAndReturnArgs} args - Arguments to update many Vessels.
     * @example
     * // Update many Vessels
     * const vessel = await prisma.vessel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vessels and only return the `id`
     * const vesselWithIdOnly = await prisma.vessel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VesselUpdateManyAndReturnArgs>(args: SelectSubset<T, VesselUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vessel.
     * @param {VesselUpsertArgs} args - Arguments to update or create a Vessel.
     * @example
     * // Update or create a Vessel
     * const vessel = await prisma.vessel.upsert({
     *   create: {
     *     // ... data to create a Vessel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vessel we want to update
     *   }
     * })
     */
    upsert<T extends VesselUpsertArgs>(args: SelectSubset<T, VesselUpsertArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vessels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselCountArgs} args - Arguments to filter Vessels to count.
     * @example
     * // Count the number of Vessels
     * const count = await prisma.vessel.count({
     *   where: {
     *     // ... the filter for the Vessels we want to count
     *   }
     * })
    **/
    count<T extends VesselCountArgs>(
      args?: Subset<T, VesselCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VesselCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vessel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VesselAggregateArgs>(args: Subset<T, VesselAggregateArgs>): Prisma.PrismaPromise<GetVesselAggregateType<T>>

    /**
     * Group by Vessel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VesselGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VesselGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VesselGroupByArgs['orderBy'] }
        : { orderBy?: VesselGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VesselGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVesselGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vessel model
   */
  readonly fields: VesselFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vessel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VesselClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trips<T extends Vessel$tripsArgs<ExtArgs> = {}>(args?: Subset<T, Vessel$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    alerts<T extends Vessel$alertsArgs<ExtArgs> = {}>(args?: Subset<T, Vessel$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gpsLogs<T extends Vessel$gpsLogsArgs<ExtArgs> = {}>(args?: Subset<T, Vessel$gpsLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vessel model
   */
  interface VesselFieldRefs {
    readonly id: FieldRef<"Vessel", 'String'>
    readonly name: FieldRef<"Vessel", 'String'>
    readonly imo: FieldRef<"Vessel", 'String'>
    readonly mmsi: FieldRef<"Vessel", 'String'>
    readonly type: FieldRef<"Vessel", 'VesselType'>
    readonly flag: FieldRef<"Vessel", 'String'>
    readonly deletedAt: FieldRef<"Vessel", 'DateTime'>
    readonly createdAt: FieldRef<"Vessel", 'DateTime'>
    readonly updatedAt: FieldRef<"Vessel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vessel findUnique
   */
  export type VesselFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter, which Vessel to fetch.
     */
    where: VesselWhereUniqueInput
  }

  /**
   * Vessel findUniqueOrThrow
   */
  export type VesselFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter, which Vessel to fetch.
     */
    where: VesselWhereUniqueInput
  }

  /**
   * Vessel findFirst
   */
  export type VesselFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter, which Vessel to fetch.
     */
    where?: VesselWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vessels to fetch.
     */
    orderBy?: VesselOrderByWithRelationInput | VesselOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vessels.
     */
    cursor?: VesselWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vessels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vessels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vessels.
     */
    distinct?: VesselScalarFieldEnum | VesselScalarFieldEnum[]
  }

  /**
   * Vessel findFirstOrThrow
   */
  export type VesselFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter, which Vessel to fetch.
     */
    where?: VesselWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vessels to fetch.
     */
    orderBy?: VesselOrderByWithRelationInput | VesselOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vessels.
     */
    cursor?: VesselWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vessels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vessels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vessels.
     */
    distinct?: VesselScalarFieldEnum | VesselScalarFieldEnum[]
  }

  /**
   * Vessel findMany
   */
  export type VesselFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter, which Vessels to fetch.
     */
    where?: VesselWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vessels to fetch.
     */
    orderBy?: VesselOrderByWithRelationInput | VesselOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vessels.
     */
    cursor?: VesselWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vessels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vessels.
     */
    skip?: number
    distinct?: VesselScalarFieldEnum | VesselScalarFieldEnum[]
  }

  /**
   * Vessel create
   */
  export type VesselCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * The data needed to create a Vessel.
     */
    data: XOR<VesselCreateInput, VesselUncheckedCreateInput>
  }

  /**
   * Vessel createMany
   */
  export type VesselCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vessels.
     */
    data: VesselCreateManyInput | VesselCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vessel createManyAndReturn
   */
  export type VesselCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * The data used to create many Vessels.
     */
    data: VesselCreateManyInput | VesselCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vessel update
   */
  export type VesselUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * The data needed to update a Vessel.
     */
    data: XOR<VesselUpdateInput, VesselUncheckedUpdateInput>
    /**
     * Choose, which Vessel to update.
     */
    where: VesselWhereUniqueInput
  }

  /**
   * Vessel updateMany
   */
  export type VesselUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vessels.
     */
    data: XOR<VesselUpdateManyMutationInput, VesselUncheckedUpdateManyInput>
    /**
     * Filter which Vessels to update
     */
    where?: VesselWhereInput
    /**
     * Limit how many Vessels to update.
     */
    limit?: number
  }

  /**
   * Vessel updateManyAndReturn
   */
  export type VesselUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * The data used to update Vessels.
     */
    data: XOR<VesselUpdateManyMutationInput, VesselUncheckedUpdateManyInput>
    /**
     * Filter which Vessels to update
     */
    where?: VesselWhereInput
    /**
     * Limit how many Vessels to update.
     */
    limit?: number
  }

  /**
   * Vessel upsert
   */
  export type VesselUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * The filter to search for the Vessel to update in case it exists.
     */
    where: VesselWhereUniqueInput
    /**
     * In case the Vessel found by the `where` argument doesn't exist, create a new Vessel with this data.
     */
    create: XOR<VesselCreateInput, VesselUncheckedCreateInput>
    /**
     * In case the Vessel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VesselUpdateInput, VesselUncheckedUpdateInput>
  }

  /**
   * Vessel delete
   */
  export type VesselDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    /**
     * Filter which Vessel to delete.
     */
    where: VesselWhereUniqueInput
  }

  /**
   * Vessel deleteMany
   */
  export type VesselDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vessels to delete
     */
    where?: VesselWhereInput
    /**
     * Limit how many Vessels to delete.
     */
    limit?: number
  }

  /**
   * Vessel.trips
   */
  export type Vessel$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    where?: TripWhereInput
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    cursor?: TripWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Vessel.alerts
   */
  export type Vessel$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Vessel.gpsLogs
   */
  export type Vessel$gpsLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    where?: GpsLogWhereInput
    orderBy?: GpsLogOrderByWithRelationInput | GpsLogOrderByWithRelationInput[]
    cursor?: GpsLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GpsLogScalarFieldEnum | GpsLogScalarFieldEnum[]
  }

  /**
   * Vessel without action
   */
  export type VesselDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
  }


  /**
   * Model Trip
   */

  export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  export type TripMinAggregateOutputType = {
    id: string | null
    vesselId: string | null
    status: $Enums.TripStatus | null
    startTime: Date | null
    endTime: Date | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripMaxAggregateOutputType = {
    id: string | null
    vesselId: string | null
    status: $Enums.TripStatus | null
    startTime: Date | null
    endTime: Date | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripCountAggregateOutputType = {
    id: number
    vesselId: number
    status: number
    startTime: number
    endTime: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TripMinAggregateInputType = {
    id?: true
    vesselId?: true
    status?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripMaxAggregateInputType = {
    id?: true
    vesselId?: true
    status?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripCountAggregateInputType = {
    id?: true
    vesselId?: true
    status?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TripAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trip to aggregate.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trips
    **/
    _count?: true | TripCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType
  }

  export type GetTripAggregateType<T extends TripAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip[P]>
      : GetScalarType<T[P], AggregateTrip[P]>
  }




  export type TripGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
    orderBy?: TripOrderByWithAggregationInput | TripOrderByWithAggregationInput[]
    by: TripScalarFieldEnum[] | TripScalarFieldEnum
    having?: TripScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCountAggregateInputType | true
    _min?: TripMinAggregateInputType
    _max?: TripMaxAggregateInputType
  }

  export type TripGroupByOutputType = {
    id: string
    vesselId: string
    status: $Enums.TripStatus
    startTime: Date | null
    endTime: Date | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TripCountAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  type GetTripGroupByPayload<T extends TripGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripGroupByOutputType[P]>
            : GetScalarType<T[P], TripGroupByOutputType[P]>
        }
      >
    >


  export type TripSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    points?: boolean | Trip$pointsArgs<ExtArgs>
    alerts?: boolean | Trip$alertsArgs<ExtArgs>
    history?: boolean | Trip$historyArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectScalar = {
    id?: boolean
    vesselId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TripOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vesselId" | "status" | "startTime" | "endTime" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["trip"]>
  export type TripInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    points?: boolean | Trip$pointsArgs<ExtArgs>
    alerts?: boolean | Trip$alertsArgs<ExtArgs>
    history?: boolean | Trip$historyArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TripIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
  }
  export type TripIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
  }

  export type $TripPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trip"
    objects: {
      vessel: Prisma.$VesselPayload<ExtArgs>
      points: Prisma.$LocationPointPayload<ExtArgs>[]
      alerts: Prisma.$AlertPayload<ExtArgs>[]
      history: Prisma.$TripStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vesselId: string
      status: $Enums.TripStatus
      startTime: Date | null
      endTime: Date | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trip"]>
    composites: {}
  }

  type TripGetPayload<S extends boolean | null | undefined | TripDefaultArgs> = $Result.GetResult<Prisma.$TripPayload, S>

  type TripCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TripFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripCountAggregateInputType | true
    }

  export interface TripDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trip'], meta: { name: 'Trip' } }
    /**
     * Find zero or one Trip that matches the filter.
     * @param {TripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripFindUniqueArgs>(args: SelectSubset<T, TripFindUniqueArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripFindUniqueOrThrowArgs>(args: SelectSubset<T, TripFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripFindFirstArgs>(args?: SelectSubset<T, TripFindFirstArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripFindFirstOrThrowArgs>(args?: SelectSubset<T, TripFindFirstOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripWithIdOnly = await prisma.trip.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TripFindManyArgs>(args?: SelectSubset<T, TripFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trip.
     * @param {TripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     * 
     */
    create<T extends TripCreateArgs>(args: SelectSubset<T, TripCreateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trips.
     * @param {TripCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TripCreateManyArgs>(args?: SelectSubset<T, TripCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trips and returns the data saved in the database.
     * @param {TripCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TripCreateManyAndReturnArgs>(args?: SelectSubset<T, TripCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trip.
     * @param {TripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     * 
     */
    delete<T extends TripDeleteArgs>(args: SelectSubset<T, TripDeleteArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trip.
     * @param {TripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TripUpdateArgs>(args: SelectSubset<T, TripUpdateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trips.
     * @param {TripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TripDeleteManyArgs>(args?: SelectSubset<T, TripDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TripUpdateManyArgs>(args: SelectSubset<T, TripUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {TripUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TripUpdateManyAndReturnArgs>(args: SelectSubset<T, TripUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trip.
     * @param {TripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
     */
    upsert<T extends TripUpsertArgs>(args: SelectSubset<T, TripUpsertArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends TripCountArgs>(
      args?: Subset<T, TripCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Subset<T, TripAggregateArgs>): Prisma.PrismaPromise<GetTripAggregateType<T>>

    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripGroupByArgs['orderBy'] }
        : { orderBy?: TripGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trip model
   */
  readonly fields: TripFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TripClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vessel<T extends VesselDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VesselDefaultArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    points<T extends Trip$pointsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$pointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    alerts<T extends Trip$alertsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    history<T extends Trip$historyArgs<ExtArgs> = {}>(args?: Subset<T, Trip$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trip model
   */
  interface TripFieldRefs {
    readonly id: FieldRef<"Trip", 'String'>
    readonly vesselId: FieldRef<"Trip", 'String'>
    readonly status: FieldRef<"Trip", 'TripStatus'>
    readonly startTime: FieldRef<"Trip", 'DateTime'>
    readonly endTime: FieldRef<"Trip", 'DateTime'>
    readonly deletedAt: FieldRef<"Trip", 'DateTime'>
    readonly createdAt: FieldRef<"Trip", 'DateTime'>
    readonly updatedAt: FieldRef<"Trip", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trip findUnique
   */
  export type TripFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findUniqueOrThrow
   */
  export type TripFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findFirst
   */
  export type TripFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findFirstOrThrow
   */
  export type TripFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findMany
   */
  export type TripFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trips to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip create
   */
  export type TripCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to create a Trip.
     */
    data: XOR<TripCreateInput, TripUncheckedCreateInput>
  }

  /**
   * Trip createMany
   */
  export type TripCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trip createManyAndReturn
   */
  export type TripCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trip update
   */
  export type TripUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to update a Trip.
     */
    data: XOR<TripUpdateInput, TripUncheckedUpdateInput>
    /**
     * Choose, which Trip to update.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip updateMany
   */
  export type TripUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
  }

  /**
   * Trip updateManyAndReturn
   */
  export type TripUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trip upsert
   */
  export type TripUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The filter to search for the Trip to update in case it exists.
     */
    where: TripWhereUniqueInput
    /**
     * In case the Trip found by the `where` argument doesn't exist, create a new Trip with this data.
     */
    create: XOR<TripCreateInput, TripUncheckedCreateInput>
    /**
     * In case the Trip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TripUpdateInput, TripUncheckedUpdateInput>
  }

  /**
   * Trip delete
   */
  export type TripDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter which Trip to delete.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip deleteMany
   */
  export type TripDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trips to delete
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to delete.
     */
    limit?: number
  }

  /**
   * Trip.points
   */
  export type Trip$pointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    where?: LocationPointWhereInput
    orderBy?: LocationPointOrderByWithRelationInput | LocationPointOrderByWithRelationInput[]
    cursor?: LocationPointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationPointScalarFieldEnum | LocationPointScalarFieldEnum[]
  }

  /**
   * Trip.alerts
   */
  export type Trip$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Trip.history
   */
  export type Trip$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    where?: TripStatusHistoryWhereInput
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    cursor?: TripStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripStatusHistoryScalarFieldEnum | TripStatusHistoryScalarFieldEnum[]
  }

  /**
   * Trip without action
   */
  export type TripDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
  }


  /**
   * Model LocationPoint
   */

  export type AggregateLocationPoint = {
    _count: LocationPointCountAggregateOutputType | null
    _avg: LocationPointAvgAggregateOutputType | null
    _sum: LocationPointSumAggregateOutputType | null
    _min: LocationPointMinAggregateOutputType | null
    _max: LocationPointMaxAggregateOutputType | null
  }

  export type LocationPointAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
  }

  export type LocationPointSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
  }

  export type LocationPointMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    timestamp: Date | null
  }

  export type LocationPointMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    timestamp: Date | null
  }

  export type LocationPointCountAggregateOutputType = {
    id: number
    tripId: number
    latitude: number
    longitude: number
    speed: number
    heading: number
    timestamp: number
    _all: number
  }


  export type LocationPointAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
  }

  export type LocationPointSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
  }

  export type LocationPointMinAggregateInputType = {
    id?: true
    tripId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
  }

  export type LocationPointMaxAggregateInputType = {
    id?: true
    tripId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
  }

  export type LocationPointCountAggregateInputType = {
    id?: true
    tripId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
    _all?: true
  }

  export type LocationPointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationPoint to aggregate.
     */
    where?: LocationPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationPoints to fetch.
     */
    orderBy?: LocationPointOrderByWithRelationInput | LocationPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocationPoints
    **/
    _count?: true | LocationPointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationPointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationPointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationPointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationPointMaxAggregateInputType
  }

  export type GetLocationPointAggregateType<T extends LocationPointAggregateArgs> = {
        [P in keyof T & keyof AggregateLocationPoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocationPoint[P]>
      : GetScalarType<T[P], AggregateLocationPoint[P]>
  }




  export type LocationPointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationPointWhereInput
    orderBy?: LocationPointOrderByWithAggregationInput | LocationPointOrderByWithAggregationInput[]
    by: LocationPointScalarFieldEnum[] | LocationPointScalarFieldEnum
    having?: LocationPointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationPointCountAggregateInputType | true
    _avg?: LocationPointAvgAggregateInputType
    _sum?: LocationPointSumAggregateInputType
    _min?: LocationPointMinAggregateInputType
    _max?: LocationPointMaxAggregateInputType
  }

  export type LocationPointGroupByOutputType = {
    id: string
    tripId: string
    latitude: number
    longitude: number
    speed: number | null
    heading: number | null
    timestamp: Date
    _count: LocationPointCountAggregateOutputType | null
    _avg: LocationPointAvgAggregateOutputType | null
    _sum: LocationPointSumAggregateOutputType | null
    _min: LocationPointMinAggregateOutputType | null
    _max: LocationPointMaxAggregateOutputType | null
  }

  type GetLocationPointGroupByPayload<T extends LocationPointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationPointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationPointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationPointGroupByOutputType[P]>
            : GetScalarType<T[P], LocationPointGroupByOutputType[P]>
        }
      >
    >


  export type LocationPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationPoint"]>

  export type LocationPointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationPoint"]>

  export type LocationPointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationPoint"]>

  export type LocationPointSelectScalar = {
    id?: boolean
    tripId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
  }

  export type LocationPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "latitude" | "longitude" | "speed" | "heading" | "timestamp", ExtArgs["result"]["locationPoint"]>
  export type LocationPointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type LocationPointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type LocationPointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $LocationPointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocationPoint"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      latitude: number
      longitude: number
      speed: number | null
      heading: number | null
      timestamp: Date
    }, ExtArgs["result"]["locationPoint"]>
    composites: {}
  }

  type LocationPointGetPayload<S extends boolean | null | undefined | LocationPointDefaultArgs> = $Result.GetResult<Prisma.$LocationPointPayload, S>

  type LocationPointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationPointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationPointCountAggregateInputType | true
    }

  export interface LocationPointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocationPoint'], meta: { name: 'LocationPoint' } }
    /**
     * Find zero or one LocationPoint that matches the filter.
     * @param {LocationPointFindUniqueArgs} args - Arguments to find a LocationPoint
     * @example
     * // Get one LocationPoint
     * const locationPoint = await prisma.locationPoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationPointFindUniqueArgs>(args: SelectSubset<T, LocationPointFindUniqueArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LocationPoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationPointFindUniqueOrThrowArgs} args - Arguments to find a LocationPoint
     * @example
     * // Get one LocationPoint
     * const locationPoint = await prisma.locationPoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationPointFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationPointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationPoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointFindFirstArgs} args - Arguments to find a LocationPoint
     * @example
     * // Get one LocationPoint
     * const locationPoint = await prisma.locationPoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationPointFindFirstArgs>(args?: SelectSubset<T, LocationPointFindFirstArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationPoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointFindFirstOrThrowArgs} args - Arguments to find a LocationPoint
     * @example
     * // Get one LocationPoint
     * const locationPoint = await prisma.locationPoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationPointFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationPointFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LocationPoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationPoints
     * const locationPoints = await prisma.locationPoint.findMany()
     * 
     * // Get first 10 LocationPoints
     * const locationPoints = await prisma.locationPoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationPointWithIdOnly = await prisma.locationPoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationPointFindManyArgs>(args?: SelectSubset<T, LocationPointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LocationPoint.
     * @param {LocationPointCreateArgs} args - Arguments to create a LocationPoint.
     * @example
     * // Create one LocationPoint
     * const LocationPoint = await prisma.locationPoint.create({
     *   data: {
     *     // ... data to create a LocationPoint
     *   }
     * })
     * 
     */
    create<T extends LocationPointCreateArgs>(args: SelectSubset<T, LocationPointCreateArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LocationPoints.
     * @param {LocationPointCreateManyArgs} args - Arguments to create many LocationPoints.
     * @example
     * // Create many LocationPoints
     * const locationPoint = await prisma.locationPoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationPointCreateManyArgs>(args?: SelectSubset<T, LocationPointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocationPoints and returns the data saved in the database.
     * @param {LocationPointCreateManyAndReturnArgs} args - Arguments to create many LocationPoints.
     * @example
     * // Create many LocationPoints
     * const locationPoint = await prisma.locationPoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocationPoints and only return the `id`
     * const locationPointWithIdOnly = await prisma.locationPoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationPointCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationPointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LocationPoint.
     * @param {LocationPointDeleteArgs} args - Arguments to delete one LocationPoint.
     * @example
     * // Delete one LocationPoint
     * const LocationPoint = await prisma.locationPoint.delete({
     *   where: {
     *     // ... filter to delete one LocationPoint
     *   }
     * })
     * 
     */
    delete<T extends LocationPointDeleteArgs>(args: SelectSubset<T, LocationPointDeleteArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LocationPoint.
     * @param {LocationPointUpdateArgs} args - Arguments to update one LocationPoint.
     * @example
     * // Update one LocationPoint
     * const locationPoint = await prisma.locationPoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationPointUpdateArgs>(args: SelectSubset<T, LocationPointUpdateArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LocationPoints.
     * @param {LocationPointDeleteManyArgs} args - Arguments to filter LocationPoints to delete.
     * @example
     * // Delete a few LocationPoints
     * const { count } = await prisma.locationPoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationPointDeleteManyArgs>(args?: SelectSubset<T, LocationPointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationPoints
     * const locationPoint = await prisma.locationPoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationPointUpdateManyArgs>(args: SelectSubset<T, LocationPointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationPoints and returns the data updated in the database.
     * @param {LocationPointUpdateManyAndReturnArgs} args - Arguments to update many LocationPoints.
     * @example
     * // Update many LocationPoints
     * const locationPoint = await prisma.locationPoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LocationPoints and only return the `id`
     * const locationPointWithIdOnly = await prisma.locationPoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationPointUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationPointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LocationPoint.
     * @param {LocationPointUpsertArgs} args - Arguments to update or create a LocationPoint.
     * @example
     * // Update or create a LocationPoint
     * const locationPoint = await prisma.locationPoint.upsert({
     *   create: {
     *     // ... data to create a LocationPoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationPoint we want to update
     *   }
     * })
     */
    upsert<T extends LocationPointUpsertArgs>(args: SelectSubset<T, LocationPointUpsertArgs<ExtArgs>>): Prisma__LocationPointClient<$Result.GetResult<Prisma.$LocationPointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LocationPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointCountArgs} args - Arguments to filter LocationPoints to count.
     * @example
     * // Count the number of LocationPoints
     * const count = await prisma.locationPoint.count({
     *   where: {
     *     // ... the filter for the LocationPoints we want to count
     *   }
     * })
    **/
    count<T extends LocationPointCountArgs>(
      args?: Subset<T, LocationPointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationPointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocationPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationPointAggregateArgs>(args: Subset<T, LocationPointAggregateArgs>): Prisma.PrismaPromise<GetLocationPointAggregateType<T>>

    /**
     * Group by LocationPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationPointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationPointGroupByArgs['orderBy'] }
        : { orderBy?: LocationPointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationPointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocationPoint model
   */
  readonly fields: LocationPointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocationPoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationPointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LocationPoint model
   */
  interface LocationPointFieldRefs {
    readonly id: FieldRef<"LocationPoint", 'String'>
    readonly tripId: FieldRef<"LocationPoint", 'String'>
    readonly latitude: FieldRef<"LocationPoint", 'Float'>
    readonly longitude: FieldRef<"LocationPoint", 'Float'>
    readonly speed: FieldRef<"LocationPoint", 'Float'>
    readonly heading: FieldRef<"LocationPoint", 'Float'>
    readonly timestamp: FieldRef<"LocationPoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocationPoint findUnique
   */
  export type LocationPointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter, which LocationPoint to fetch.
     */
    where: LocationPointWhereUniqueInput
  }

  /**
   * LocationPoint findUniqueOrThrow
   */
  export type LocationPointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter, which LocationPoint to fetch.
     */
    where: LocationPointWhereUniqueInput
  }

  /**
   * LocationPoint findFirst
   */
  export type LocationPointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter, which LocationPoint to fetch.
     */
    where?: LocationPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationPoints to fetch.
     */
    orderBy?: LocationPointOrderByWithRelationInput | LocationPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationPoints.
     */
    cursor?: LocationPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationPoints.
     */
    distinct?: LocationPointScalarFieldEnum | LocationPointScalarFieldEnum[]
  }

  /**
   * LocationPoint findFirstOrThrow
   */
  export type LocationPointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter, which LocationPoint to fetch.
     */
    where?: LocationPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationPoints to fetch.
     */
    orderBy?: LocationPointOrderByWithRelationInput | LocationPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationPoints.
     */
    cursor?: LocationPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationPoints.
     */
    distinct?: LocationPointScalarFieldEnum | LocationPointScalarFieldEnum[]
  }

  /**
   * LocationPoint findMany
   */
  export type LocationPointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter, which LocationPoints to fetch.
     */
    where?: LocationPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationPoints to fetch.
     */
    orderBy?: LocationPointOrderByWithRelationInput | LocationPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocationPoints.
     */
    cursor?: LocationPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationPoints.
     */
    skip?: number
    distinct?: LocationPointScalarFieldEnum | LocationPointScalarFieldEnum[]
  }

  /**
   * LocationPoint create
   */
  export type LocationPointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * The data needed to create a LocationPoint.
     */
    data: XOR<LocationPointCreateInput, LocationPointUncheckedCreateInput>
  }

  /**
   * LocationPoint createMany
   */
  export type LocationPointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationPoints.
     */
    data: LocationPointCreateManyInput | LocationPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationPoint createManyAndReturn
   */
  export type LocationPointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * The data used to create many LocationPoints.
     */
    data: LocationPointCreateManyInput | LocationPointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationPoint update
   */
  export type LocationPointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * The data needed to update a LocationPoint.
     */
    data: XOR<LocationPointUpdateInput, LocationPointUncheckedUpdateInput>
    /**
     * Choose, which LocationPoint to update.
     */
    where: LocationPointWhereUniqueInput
  }

  /**
   * LocationPoint updateMany
   */
  export type LocationPointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationPoints.
     */
    data: XOR<LocationPointUpdateManyMutationInput, LocationPointUncheckedUpdateManyInput>
    /**
     * Filter which LocationPoints to update
     */
    where?: LocationPointWhereInput
    /**
     * Limit how many LocationPoints to update.
     */
    limit?: number
  }

  /**
   * LocationPoint updateManyAndReturn
   */
  export type LocationPointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * The data used to update LocationPoints.
     */
    data: XOR<LocationPointUpdateManyMutationInput, LocationPointUncheckedUpdateManyInput>
    /**
     * Filter which LocationPoints to update
     */
    where?: LocationPointWhereInput
    /**
     * Limit how many LocationPoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationPoint upsert
   */
  export type LocationPointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * The filter to search for the LocationPoint to update in case it exists.
     */
    where: LocationPointWhereUniqueInput
    /**
     * In case the LocationPoint found by the `where` argument doesn't exist, create a new LocationPoint with this data.
     */
    create: XOR<LocationPointCreateInput, LocationPointUncheckedCreateInput>
    /**
     * In case the LocationPoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationPointUpdateInput, LocationPointUncheckedUpdateInput>
  }

  /**
   * LocationPoint delete
   */
  export type LocationPointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
    /**
     * Filter which LocationPoint to delete.
     */
    where: LocationPointWhereUniqueInput
  }

  /**
   * LocationPoint deleteMany
   */
  export type LocationPointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationPoints to delete
     */
    where?: LocationPointWhereInput
    /**
     * Limit how many LocationPoints to delete.
     */
    limit?: number
  }

  /**
   * LocationPoint without action
   */
  export type LocationPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPoint
     */
    select?: LocationPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationPoint
     */
    omit?: LocationPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationPointInclude<ExtArgs> | null
  }


  /**
   * Model Zone
   */

  export type AggregateZone = {
    _count: ZoneCountAggregateOutputType | null
    _min: ZoneMinAggregateOutputType | null
    _max: ZoneMaxAggregateOutputType | null
  }

  export type ZoneMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ZoneMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ZoneCountAggregateOutputType = {
    id: number
    name: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ZoneMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ZoneMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ZoneCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zone to aggregate.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Zones
    **/
    _count?: true | ZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ZoneMaxAggregateInputType
  }

  export type GetZoneAggregateType<T extends ZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateZone[P]>
      : GetScalarType<T[P], AggregateZone[P]>
  }




  export type ZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ZoneWhereInput
    orderBy?: ZoneOrderByWithAggregationInput | ZoneOrderByWithAggregationInput[]
    by: ZoneScalarFieldEnum[] | ZoneScalarFieldEnum
    having?: ZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ZoneCountAggregateInputType | true
    _min?: ZoneMinAggregateInputType
    _max?: ZoneMaxAggregateInputType
  }

  export type ZoneGroupByOutputType = {
    id: string
    name: string
    type: string
    createdAt: Date
    updatedAt: Date
    _count: ZoneCountAggregateOutputType | null
    _min: ZoneMinAggregateOutputType | null
    _max: ZoneMaxAggregateOutputType | null
  }

  type GetZoneGroupByPayload<T extends ZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ZoneGroupByOutputType[P]>
            : GetScalarType<T[P], ZoneGroupByOutputType[P]>
        }
      >
    >


  export type ZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alerts?: boolean | Zone$alertsArgs<ExtArgs>
    _count?: boolean | ZoneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["zone"]>


  export type ZoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["zone"]>

  export type ZoneSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ZoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["zone"]>
  export type ZoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | Zone$alertsArgs<ExtArgs>
    _count?: boolean | ZoneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ZoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Zone"
    objects: {
      alerts: Prisma.$AlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["zone"]>
    composites: {}
  }

  type ZoneGetPayload<S extends boolean | null | undefined | ZoneDefaultArgs> = $Result.GetResult<Prisma.$ZonePayload, S>

  type ZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ZoneCountAggregateInputType | true
    }

  export interface ZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Zone'], meta: { name: 'Zone' } }
    /**
     * Find zero or one Zone that matches the filter.
     * @param {ZoneFindUniqueArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ZoneFindUniqueArgs>(args: SelectSubset<T, ZoneFindUniqueArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Zone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ZoneFindUniqueOrThrowArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, ZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindFirstArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ZoneFindFirstArgs>(args?: SelectSubset<T, ZoneFindFirstArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindFirstOrThrowArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, ZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Zones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Zones
     * const zones = await prisma.zone.findMany()
     * 
     * // Get first 10 Zones
     * const zones = await prisma.zone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const zoneWithIdOnly = await prisma.zone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ZoneFindManyArgs>(args?: SelectSubset<T, ZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a Zone.
     * @param {ZoneDeleteArgs} args - Arguments to delete one Zone.
     * @example
     * // Delete one Zone
     * const Zone = await prisma.zone.delete({
     *   where: {
     *     // ... filter to delete one Zone
     *   }
     * })
     * 
     */
    delete<T extends ZoneDeleteArgs>(args: SelectSubset<T, ZoneDeleteArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Zone.
     * @param {ZoneUpdateArgs} args - Arguments to update one Zone.
     * @example
     * // Update one Zone
     * const zone = await prisma.zone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ZoneUpdateArgs>(args: SelectSubset<T, ZoneUpdateArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Zones.
     * @param {ZoneDeleteManyArgs} args - Arguments to filter Zones to delete.
     * @example
     * // Delete a few Zones
     * const { count } = await prisma.zone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ZoneDeleteManyArgs>(args?: SelectSubset<T, ZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Zones
     * const zone = await prisma.zone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ZoneUpdateManyArgs>(args: SelectSubset<T, ZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zones and returns the data updated in the database.
     * @param {ZoneUpdateManyAndReturnArgs} args - Arguments to update many Zones.
     * @example
     * // Update many Zones
     * const zone = await prisma.zone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Zones and only return the `id`
     * const zoneWithIdOnly = await prisma.zone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ZoneUpdateManyAndReturnArgs>(args: SelectSubset<T, ZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of Zones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneCountArgs} args - Arguments to filter Zones to count.
     * @example
     * // Count the number of Zones
     * const count = await prisma.zone.count({
     *   where: {
     *     // ... the filter for the Zones we want to count
     *   }
     * })
    **/
    count<T extends ZoneCountArgs>(
      args?: Subset<T, ZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Zone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ZoneAggregateArgs>(args: Subset<T, ZoneAggregateArgs>): Prisma.PrismaPromise<GetZoneAggregateType<T>>

    /**
     * Group by Zone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ZoneGroupByArgs['orderBy'] }
        : { orderBy?: ZoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Zone model
   */
  readonly fields: ZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Zone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alerts<T extends Zone$alertsArgs<ExtArgs> = {}>(args?: Subset<T, Zone$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Zone model
   */
  interface ZoneFieldRefs {
    readonly id: FieldRef<"Zone", 'String'>
    readonly name: FieldRef<"Zone", 'String'>
    readonly type: FieldRef<"Zone", 'String'>
    readonly createdAt: FieldRef<"Zone", 'DateTime'>
    readonly updatedAt: FieldRef<"Zone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Zone findUnique
   */
  export type ZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone findUniqueOrThrow
   */
  export type ZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone findFirst
   */
  export type ZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zones.
     */
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone findFirstOrThrow
   */
  export type ZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zones.
     */
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone findMany
   */
  export type ZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter, which Zones to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone update
   */
  export type ZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Zone.
     */
    data: XOR<ZoneUpdateInput, ZoneUncheckedUpdateInput>
    /**
     * Choose, which Zone to update.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone updateMany
   */
  export type ZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Zones.
     */
    data: XOR<ZoneUpdateManyMutationInput, ZoneUncheckedUpdateManyInput>
    /**
     * Filter which Zones to update
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to update.
     */
    limit?: number
  }

  /**
   * Zone updateManyAndReturn
   */
  export type ZoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The data used to update Zones.
     */
    data: XOR<ZoneUpdateManyMutationInput, ZoneUncheckedUpdateManyInput>
    /**
     * Filter which Zones to update
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to update.
     */
    limit?: number
  }

  /**
   * Zone delete
   */
  export type ZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    /**
     * Filter which Zone to delete.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone deleteMany
   */
  export type ZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zones to delete
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to delete.
     */
    limit?: number
  }

  /**
   * Zone.alerts
   */
  export type Zone$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Zone without action
   */
  export type ZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertMinAggregateOutputType = {
    id: string | null
    vesselId: string | null
    tripId: string | null
    zoneId: string | null
    type: string | null
    severity: $Enums.AlertSeverity | null
    status: $Enums.AlertStatus | null
    message: string | null
    timestamp: Date | null
    resolvedAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: string | null
    vesselId: string | null
    tripId: string | null
    zoneId: string | null
    type: string | null
    severity: $Enums.AlertSeverity | null
    status: $Enums.AlertStatus | null
    message: string | null
    timestamp: Date | null
    resolvedAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    vesselId: number
    tripId: number
    zoneId: number
    type: number
    severity: number
    status: number
    message: number
    timestamp: number
    resolvedAt: number
    _all: number
  }


  export type AlertMinAggregateInputType = {
    id?: true
    vesselId?: true
    tripId?: true
    zoneId?: true
    type?: true
    severity?: true
    status?: true
    message?: true
    timestamp?: true
    resolvedAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    vesselId?: true
    tripId?: true
    zoneId?: true
    type?: true
    severity?: true
    status?: true
    message?: true
    timestamp?: true
    resolvedAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    vesselId?: true
    tripId?: true
    zoneId?: true
    type?: true
    severity?: true
    status?: true
    message?: true
    timestamp?: true
    resolvedAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: string
    vesselId: string
    tripId: string | null
    zoneId: string | null
    type: string
    severity: $Enums.AlertSeverity
    status: $Enums.AlertStatus
    message: string
    timestamp: Date
    resolvedAt: Date | null
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    tripId?: boolean
    zoneId?: boolean
    type?: boolean
    severity?: boolean
    status?: boolean
    message?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    tripId?: boolean
    zoneId?: boolean
    type?: boolean
    severity?: boolean
    status?: boolean
    message?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    tripId?: boolean
    zoneId?: boolean
    type?: boolean
    severity?: boolean
    status?: boolean
    message?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    vesselId?: boolean
    tripId?: boolean
    zoneId?: boolean
    type?: boolean
    severity?: boolean
    status?: boolean
    message?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
  }

  export type AlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vesselId" | "tripId" | "zoneId" | "type" | "severity" | "status" | "message" | "timestamp" | "resolvedAt", ExtArgs["result"]["alert"]>
  export type AlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }
  export type AlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }
  export type AlertIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | VesselDefaultArgs<ExtArgs>
    trip?: boolean | Alert$tripArgs<ExtArgs>
    zone?: boolean | Alert$zoneArgs<ExtArgs>
  }

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {
      vessel: Prisma.$VesselPayload<ExtArgs>
      trip: Prisma.$TripPayload<ExtArgs> | null
      zone: Prisma.$ZonePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vesselId: string
      tripId: string | null
      zoneId: string | null
      type: string
      severity: $Enums.AlertSeverity
      status: $Enums.AlertStatus
      message: string
      timestamp: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts and returns the data updated in the database.
     * @param {AlertUpdateManyAndReturnArgs} args - Arguments to update many Alerts.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vessel<T extends VesselDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VesselDefaultArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trip<T extends Alert$tripArgs<ExtArgs> = {}>(args?: Subset<T, Alert$tripArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    zone<T extends Alert$zoneArgs<ExtArgs> = {}>(args?: Subset<T, Alert$zoneArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'String'>
    readonly vesselId: FieldRef<"Alert", 'String'>
    readonly tripId: FieldRef<"Alert", 'String'>
    readonly zoneId: FieldRef<"Alert", 'String'>
    readonly type: FieldRef<"Alert", 'String'>
    readonly severity: FieldRef<"Alert", 'AlertSeverity'>
    readonly status: FieldRef<"Alert", 'AlertStatus'>
    readonly message: FieldRef<"Alert", 'String'>
    readonly timestamp: FieldRef<"Alert", 'DateTime'>
    readonly resolvedAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert updateManyAndReturn
   */
  export type AlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to delete.
     */
    limit?: number
  }

  /**
   * Alert.trip
   */
  export type Alert$tripArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    where?: TripWhereInput
  }

  /**
   * Alert.zone
   */
  export type Alert$zoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZoneInclude<ExtArgs> | null
    where?: ZoneWhereInput
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
  }


  /**
   * Model TripStatusHistory
   */

  export type AggregateTripStatusHistory = {
    _count: TripStatusHistoryCountAggregateOutputType | null
    _min: TripStatusHistoryMinAggregateOutputType | null
    _max: TripStatusHistoryMaxAggregateOutputType | null
  }

  export type TripStatusHistoryMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    status: $Enums.TripStatus | null
    changedBy: string | null
    timestamp: Date | null
    remarks: string | null
  }

  export type TripStatusHistoryMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    status: $Enums.TripStatus | null
    changedBy: string | null
    timestamp: Date | null
    remarks: string | null
  }

  export type TripStatusHistoryCountAggregateOutputType = {
    id: number
    tripId: number
    status: number
    changedBy: number
    timestamp: number
    remarks: number
    _all: number
  }


  export type TripStatusHistoryMinAggregateInputType = {
    id?: true
    tripId?: true
    status?: true
    changedBy?: true
    timestamp?: true
    remarks?: true
  }

  export type TripStatusHistoryMaxAggregateInputType = {
    id?: true
    tripId?: true
    status?: true
    changedBy?: true
    timestamp?: true
    remarks?: true
  }

  export type TripStatusHistoryCountAggregateInputType = {
    id?: true
    tripId?: true
    status?: true
    changedBy?: true
    timestamp?: true
    remarks?: true
    _all?: true
  }

  export type TripStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TripStatusHistory to aggregate.
     */
    where?: TripStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripStatusHistories to fetch.
     */
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TripStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TripStatusHistories
    **/
    _count?: true | TripStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripStatusHistoryMaxAggregateInputType
  }

  export type GetTripStatusHistoryAggregateType<T extends TripStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTripStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTripStatusHistory[P]>
      : GetScalarType<T[P], AggregateTripStatusHistory[P]>
  }




  export type TripStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripStatusHistoryWhereInput
    orderBy?: TripStatusHistoryOrderByWithAggregationInput | TripStatusHistoryOrderByWithAggregationInput[]
    by: TripStatusHistoryScalarFieldEnum[] | TripStatusHistoryScalarFieldEnum
    having?: TripStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripStatusHistoryCountAggregateInputType | true
    _min?: TripStatusHistoryMinAggregateInputType
    _max?: TripStatusHistoryMaxAggregateInputType
  }

  export type TripStatusHistoryGroupByOutputType = {
    id: string
    tripId: string
    status: $Enums.TripStatus
    changedBy: string | null
    timestamp: Date
    remarks: string | null
    _count: TripStatusHistoryCountAggregateOutputType | null
    _min: TripStatusHistoryMinAggregateOutputType | null
    _max: TripStatusHistoryMaxAggregateOutputType | null
  }

  type GetTripStatusHistoryGroupByPayload<T extends TripStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TripStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type TripStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    status?: boolean
    changedBy?: boolean
    timestamp?: boolean
    remarks?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["tripStatusHistory"]>

  export type TripStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    status?: boolean
    changedBy?: boolean
    timestamp?: boolean
    remarks?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["tripStatusHistory"]>

  export type TripStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    status?: boolean
    changedBy?: boolean
    timestamp?: boolean
    remarks?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["tripStatusHistory"]>

  export type TripStatusHistorySelectScalar = {
    id?: boolean
    tripId?: boolean
    status?: boolean
    changedBy?: boolean
    timestamp?: boolean
    remarks?: boolean
  }

  export type TripStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "status" | "changedBy" | "timestamp" | "remarks", ExtArgs["result"]["tripStatusHistory"]>
  export type TripStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }
  export type TripStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }
  export type TripStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | TripStatusHistory$userArgs<ExtArgs>
  }

  export type $TripStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TripStatusHistory"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      status: $Enums.TripStatus
      changedBy: string | null
      timestamp: Date
      remarks: string | null
    }, ExtArgs["result"]["tripStatusHistory"]>
    composites: {}
  }

  type TripStatusHistoryGetPayload<S extends boolean | null | undefined | TripStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$TripStatusHistoryPayload, S>

  type TripStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TripStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripStatusHistoryCountAggregateInputType | true
    }

  export interface TripStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TripStatusHistory'], meta: { name: 'TripStatusHistory' } }
    /**
     * Find zero or one TripStatusHistory that matches the filter.
     * @param {TripStatusHistoryFindUniqueArgs} args - Arguments to find a TripStatusHistory
     * @example
     * // Get one TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripStatusHistoryFindUniqueArgs>(args: SelectSubset<T, TripStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TripStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a TripStatusHistory
     * @example
     * // Get one TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, TripStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TripStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryFindFirstArgs} args - Arguments to find a TripStatusHistory
     * @example
     * // Get one TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripStatusHistoryFindFirstArgs>(args?: SelectSubset<T, TripStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TripStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a TripStatusHistory
     * @example
     * // Get one TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, TripStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TripStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TripStatusHistories
     * const tripStatusHistories = await prisma.tripStatusHistory.findMany()
     * 
     * // Get first 10 TripStatusHistories
     * const tripStatusHistories = await prisma.tripStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripStatusHistoryWithIdOnly = await prisma.tripStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TripStatusHistoryFindManyArgs>(args?: SelectSubset<T, TripStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TripStatusHistory.
     * @param {TripStatusHistoryCreateArgs} args - Arguments to create a TripStatusHistory.
     * @example
     * // Create one TripStatusHistory
     * const TripStatusHistory = await prisma.tripStatusHistory.create({
     *   data: {
     *     // ... data to create a TripStatusHistory
     *   }
     * })
     * 
     */
    create<T extends TripStatusHistoryCreateArgs>(args: SelectSubset<T, TripStatusHistoryCreateArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TripStatusHistories.
     * @param {TripStatusHistoryCreateManyArgs} args - Arguments to create many TripStatusHistories.
     * @example
     * // Create many TripStatusHistories
     * const tripStatusHistory = await prisma.tripStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TripStatusHistoryCreateManyArgs>(args?: SelectSubset<T, TripStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TripStatusHistories and returns the data saved in the database.
     * @param {TripStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many TripStatusHistories.
     * @example
     * // Create many TripStatusHistories
     * const tripStatusHistory = await prisma.tripStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TripStatusHistories and only return the `id`
     * const tripStatusHistoryWithIdOnly = await prisma.tripStatusHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TripStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, TripStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TripStatusHistory.
     * @param {TripStatusHistoryDeleteArgs} args - Arguments to delete one TripStatusHistory.
     * @example
     * // Delete one TripStatusHistory
     * const TripStatusHistory = await prisma.tripStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one TripStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends TripStatusHistoryDeleteArgs>(args: SelectSubset<T, TripStatusHistoryDeleteArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TripStatusHistory.
     * @param {TripStatusHistoryUpdateArgs} args - Arguments to update one TripStatusHistory.
     * @example
     * // Update one TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TripStatusHistoryUpdateArgs>(args: SelectSubset<T, TripStatusHistoryUpdateArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TripStatusHistories.
     * @param {TripStatusHistoryDeleteManyArgs} args - Arguments to filter TripStatusHistories to delete.
     * @example
     * // Delete a few TripStatusHistories
     * const { count } = await prisma.tripStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TripStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, TripStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TripStatusHistories
     * const tripStatusHistory = await prisma.tripStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TripStatusHistoryUpdateManyArgs>(args: SelectSubset<T, TripStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripStatusHistories and returns the data updated in the database.
     * @param {TripStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many TripStatusHistories.
     * @example
     * // Update many TripStatusHistories
     * const tripStatusHistory = await prisma.tripStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TripStatusHistories and only return the `id`
     * const tripStatusHistoryWithIdOnly = await prisma.tripStatusHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TripStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, TripStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TripStatusHistory.
     * @param {TripStatusHistoryUpsertArgs} args - Arguments to update or create a TripStatusHistory.
     * @example
     * // Update or create a TripStatusHistory
     * const tripStatusHistory = await prisma.tripStatusHistory.upsert({
     *   create: {
     *     // ... data to create a TripStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TripStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends TripStatusHistoryUpsertArgs>(args: SelectSubset<T, TripStatusHistoryUpsertArgs<ExtArgs>>): Prisma__TripStatusHistoryClient<$Result.GetResult<Prisma.$TripStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TripStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryCountArgs} args - Arguments to filter TripStatusHistories to count.
     * @example
     * // Count the number of TripStatusHistories
     * const count = await prisma.tripStatusHistory.count({
     *   where: {
     *     // ... the filter for the TripStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends TripStatusHistoryCountArgs>(
      args?: Subset<T, TripStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TripStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripStatusHistoryAggregateArgs>(args: Subset<T, TripStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetTripStatusHistoryAggregateType<T>>

    /**
     * Group by TripStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TripStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TripStatusHistory model
   */
  readonly fields: TripStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TripStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TripStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends TripStatusHistory$userArgs<ExtArgs> = {}>(args?: Subset<T, TripStatusHistory$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TripStatusHistory model
   */
  interface TripStatusHistoryFieldRefs {
    readonly id: FieldRef<"TripStatusHistory", 'String'>
    readonly tripId: FieldRef<"TripStatusHistory", 'String'>
    readonly status: FieldRef<"TripStatusHistory", 'TripStatus'>
    readonly changedBy: FieldRef<"TripStatusHistory", 'String'>
    readonly timestamp: FieldRef<"TripStatusHistory", 'DateTime'>
    readonly remarks: FieldRef<"TripStatusHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TripStatusHistory findUnique
   */
  export type TripStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TripStatusHistory to fetch.
     */
    where: TripStatusHistoryWhereUniqueInput
  }

  /**
   * TripStatusHistory findUniqueOrThrow
   */
  export type TripStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TripStatusHistory to fetch.
     */
    where: TripStatusHistoryWhereUniqueInput
  }

  /**
   * TripStatusHistory findFirst
   */
  export type TripStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TripStatusHistory to fetch.
     */
    where?: TripStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripStatusHistories to fetch.
     */
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripStatusHistories.
     */
    cursor?: TripStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripStatusHistories.
     */
    distinct?: TripStatusHistoryScalarFieldEnum | TripStatusHistoryScalarFieldEnum[]
  }

  /**
   * TripStatusHistory findFirstOrThrow
   */
  export type TripStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TripStatusHistory to fetch.
     */
    where?: TripStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripStatusHistories to fetch.
     */
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripStatusHistories.
     */
    cursor?: TripStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripStatusHistories.
     */
    distinct?: TripStatusHistoryScalarFieldEnum | TripStatusHistoryScalarFieldEnum[]
  }

  /**
   * TripStatusHistory findMany
   */
  export type TripStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TripStatusHistories to fetch.
     */
    where?: TripStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripStatusHistories to fetch.
     */
    orderBy?: TripStatusHistoryOrderByWithRelationInput | TripStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TripStatusHistories.
     */
    cursor?: TripStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripStatusHistories.
     */
    skip?: number
    distinct?: TripStatusHistoryScalarFieldEnum | TripStatusHistoryScalarFieldEnum[]
  }

  /**
   * TripStatusHistory create
   */
  export type TripStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a TripStatusHistory.
     */
    data: XOR<TripStatusHistoryCreateInput, TripStatusHistoryUncheckedCreateInput>
  }

  /**
   * TripStatusHistory createMany
   */
  export type TripStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TripStatusHistories.
     */
    data: TripStatusHistoryCreateManyInput | TripStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TripStatusHistory createManyAndReturn
   */
  export type TripStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many TripStatusHistories.
     */
    data: TripStatusHistoryCreateManyInput | TripStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TripStatusHistory update
   */
  export type TripStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a TripStatusHistory.
     */
    data: XOR<TripStatusHistoryUpdateInput, TripStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which TripStatusHistory to update.
     */
    where: TripStatusHistoryWhereUniqueInput
  }

  /**
   * TripStatusHistory updateMany
   */
  export type TripStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TripStatusHistories.
     */
    data: XOR<TripStatusHistoryUpdateManyMutationInput, TripStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TripStatusHistories to update
     */
    where?: TripStatusHistoryWhereInput
    /**
     * Limit how many TripStatusHistories to update.
     */
    limit?: number
  }

  /**
   * TripStatusHistory updateManyAndReturn
   */
  export type TripStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update TripStatusHistories.
     */
    data: XOR<TripStatusHistoryUpdateManyMutationInput, TripStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TripStatusHistories to update
     */
    where?: TripStatusHistoryWhereInput
    /**
     * Limit how many TripStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TripStatusHistory upsert
   */
  export type TripStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the TripStatusHistory to update in case it exists.
     */
    where: TripStatusHistoryWhereUniqueInput
    /**
     * In case the TripStatusHistory found by the `where` argument doesn't exist, create a new TripStatusHistory with this data.
     */
    create: XOR<TripStatusHistoryCreateInput, TripStatusHistoryUncheckedCreateInput>
    /**
     * In case the TripStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TripStatusHistoryUpdateInput, TripStatusHistoryUncheckedUpdateInput>
  }

  /**
   * TripStatusHistory delete
   */
  export type TripStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which TripStatusHistory to delete.
     */
    where: TripStatusHistoryWhereUniqueInput
  }

  /**
   * TripStatusHistory deleteMany
   */
  export type TripStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TripStatusHistories to delete
     */
    where?: TripStatusHistoryWhereInput
    /**
     * Limit how many TripStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * TripStatusHistory.user
   */
  export type TripStatusHistory$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TripStatusHistory without action
   */
  export type TripStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripStatusHistory
     */
    select?: TripStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripStatusHistory
     */
    omit?: TripStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model GpsLog
   */

  export type AggregateGpsLog = {
    _count: GpsLogCountAggregateOutputType | null
    _avg: GpsLogAvgAggregateOutputType | null
    _sum: GpsLogSumAggregateOutputType | null
    _min: GpsLogMinAggregateOutputType | null
    _max: GpsLogMaxAggregateOutputType | null
  }

  export type GpsLogAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude_m: number | null
    speed_kmh: number | null
    heading_deg: number | null
    satellites: number | null
    hdop: number | null
    fix_status: number | null
    prns: number | null
    snrs: number | null
  }

  export type GpsLogSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude_m: number | null
    speed_kmh: number | null
    heading_deg: number | null
    satellites: number | null
    hdop: number | null
    fix_status: number | null
    prns: number[]
    snrs: number[]
  }

  export type GpsLogMinAggregateOutputType = {
    id: string | null
    vesselId: string | null
    mmsi: string | null
    utc_datetime: Date | null
    received_at: Date | null
    latitude: number | null
    longitude: number | null
    altitude_m: number | null
    speed_kmh: number | null
    heading_deg: number | null
    satellites: number | null
    hdop: number | null
    fix_status: number | null
  }

  export type GpsLogMaxAggregateOutputType = {
    id: string | null
    vesselId: string | null
    mmsi: string | null
    utc_datetime: Date | null
    received_at: Date | null
    latitude: number | null
    longitude: number | null
    altitude_m: number | null
    speed_kmh: number | null
    heading_deg: number | null
    satellites: number | null
    hdop: number | null
    fix_status: number | null
  }

  export type GpsLogCountAggregateOutputType = {
    id: number
    vesselId: number
    mmsi: number
    utc_datetime: number
    received_at: number
    latitude: number
    longitude: number
    altitude_m: number
    speed_kmh: number
    heading_deg: number
    satellites: number
    hdop: number
    fix_status: number
    prns: number
    snrs: number
    _all: number
  }


  export type GpsLogAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude_m?: true
    speed_kmh?: true
    heading_deg?: true
    satellites?: true
    hdop?: true
    fix_status?: true
    prns?: true
    snrs?: true
  }

  export type GpsLogSumAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude_m?: true
    speed_kmh?: true
    heading_deg?: true
    satellites?: true
    hdop?: true
    fix_status?: true
    prns?: true
    snrs?: true
  }

  export type GpsLogMinAggregateInputType = {
    id?: true
    vesselId?: true
    mmsi?: true
    utc_datetime?: true
    received_at?: true
    latitude?: true
    longitude?: true
    altitude_m?: true
    speed_kmh?: true
    heading_deg?: true
    satellites?: true
    hdop?: true
    fix_status?: true
  }

  export type GpsLogMaxAggregateInputType = {
    id?: true
    vesselId?: true
    mmsi?: true
    utc_datetime?: true
    received_at?: true
    latitude?: true
    longitude?: true
    altitude_m?: true
    speed_kmh?: true
    heading_deg?: true
    satellites?: true
    hdop?: true
    fix_status?: true
  }

  export type GpsLogCountAggregateInputType = {
    id?: true
    vesselId?: true
    mmsi?: true
    utc_datetime?: true
    received_at?: true
    latitude?: true
    longitude?: true
    altitude_m?: true
    speed_kmh?: true
    heading_deg?: true
    satellites?: true
    hdop?: true
    fix_status?: true
    prns?: true
    snrs?: true
    _all?: true
  }

  export type GpsLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GpsLog to aggregate.
     */
    where?: GpsLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpsLogs to fetch.
     */
    orderBy?: GpsLogOrderByWithRelationInput | GpsLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GpsLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpsLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpsLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GpsLogs
    **/
    _count?: true | GpsLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GpsLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GpsLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GpsLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GpsLogMaxAggregateInputType
  }

  export type GetGpsLogAggregateType<T extends GpsLogAggregateArgs> = {
        [P in keyof T & keyof AggregateGpsLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGpsLog[P]>
      : GetScalarType<T[P], AggregateGpsLog[P]>
  }




  export type GpsLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GpsLogWhereInput
    orderBy?: GpsLogOrderByWithAggregationInput | GpsLogOrderByWithAggregationInput[]
    by: GpsLogScalarFieldEnum[] | GpsLogScalarFieldEnum
    having?: GpsLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GpsLogCountAggregateInputType | true
    _avg?: GpsLogAvgAggregateInputType
    _sum?: GpsLogSumAggregateInputType
    _min?: GpsLogMinAggregateInputType
    _max?: GpsLogMaxAggregateInputType
  }

  export type GpsLogGroupByOutputType = {
    id: string
    vesselId: string | null
    mmsi: string | null
    utc_datetime: Date
    received_at: Date
    latitude: number
    longitude: number
    altitude_m: number | null
    speed_kmh: number | null
    heading_deg: number | null
    satellites: number | null
    hdop: number | null
    fix_status: number | null
    prns: number[]
    snrs: number[]
    _count: GpsLogCountAggregateOutputType | null
    _avg: GpsLogAvgAggregateOutputType | null
    _sum: GpsLogSumAggregateOutputType | null
    _min: GpsLogMinAggregateOutputType | null
    _max: GpsLogMaxAggregateOutputType | null
  }

  type GetGpsLogGroupByPayload<T extends GpsLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GpsLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GpsLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GpsLogGroupByOutputType[P]>
            : GetScalarType<T[P], GpsLogGroupByOutputType[P]>
        }
      >
    >


  export type GpsLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    mmsi?: boolean
    utc_datetime?: boolean
    received_at?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude_m?: boolean
    speed_kmh?: boolean
    heading_deg?: boolean
    satellites?: boolean
    hdop?: boolean
    fix_status?: boolean
    prns?: boolean
    snrs?: boolean
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }, ExtArgs["result"]["gpsLog"]>

  export type GpsLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    mmsi?: boolean
    utc_datetime?: boolean
    received_at?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude_m?: boolean
    speed_kmh?: boolean
    heading_deg?: boolean
    satellites?: boolean
    hdop?: boolean
    fix_status?: boolean
    prns?: boolean
    snrs?: boolean
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }, ExtArgs["result"]["gpsLog"]>

  export type GpsLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vesselId?: boolean
    mmsi?: boolean
    utc_datetime?: boolean
    received_at?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude_m?: boolean
    speed_kmh?: boolean
    heading_deg?: boolean
    satellites?: boolean
    hdop?: boolean
    fix_status?: boolean
    prns?: boolean
    snrs?: boolean
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }, ExtArgs["result"]["gpsLog"]>

  export type GpsLogSelectScalar = {
    id?: boolean
    vesselId?: boolean
    mmsi?: boolean
    utc_datetime?: boolean
    received_at?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude_m?: boolean
    speed_kmh?: boolean
    heading_deg?: boolean
    satellites?: boolean
    hdop?: boolean
    fix_status?: boolean
    prns?: boolean
    snrs?: boolean
  }

  export type GpsLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vesselId" | "mmsi" | "utc_datetime" | "received_at" | "latitude" | "longitude" | "altitude_m" | "speed_kmh" | "heading_deg" | "satellites" | "hdop" | "fix_status" | "prns" | "snrs", ExtArgs["result"]["gpsLog"]>
  export type GpsLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }
  export type GpsLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }
  export type GpsLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vessel?: boolean | GpsLog$vesselArgs<ExtArgs>
  }

  export type $GpsLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GpsLog"
    objects: {
      vessel: Prisma.$VesselPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vesselId: string | null
      mmsi: string | null
      utc_datetime: Date
      received_at: Date
      latitude: number
      longitude: number
      altitude_m: number | null
      speed_kmh: number | null
      heading_deg: number | null
      satellites: number | null
      hdop: number | null
      fix_status: number | null
      prns: number[]
      snrs: number[]
    }, ExtArgs["result"]["gpsLog"]>
    composites: {}
  }

  type GpsLogGetPayload<S extends boolean | null | undefined | GpsLogDefaultArgs> = $Result.GetResult<Prisma.$GpsLogPayload, S>

  type GpsLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GpsLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GpsLogCountAggregateInputType | true
    }

  export interface GpsLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GpsLog'], meta: { name: 'GpsLog' } }
    /**
     * Find zero or one GpsLog that matches the filter.
     * @param {GpsLogFindUniqueArgs} args - Arguments to find a GpsLog
     * @example
     * // Get one GpsLog
     * const gpsLog = await prisma.gpsLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GpsLogFindUniqueArgs>(args: SelectSubset<T, GpsLogFindUniqueArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GpsLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GpsLogFindUniqueOrThrowArgs} args - Arguments to find a GpsLog
     * @example
     * // Get one GpsLog
     * const gpsLog = await prisma.gpsLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GpsLogFindUniqueOrThrowArgs>(args: SelectSubset<T, GpsLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GpsLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogFindFirstArgs} args - Arguments to find a GpsLog
     * @example
     * // Get one GpsLog
     * const gpsLog = await prisma.gpsLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GpsLogFindFirstArgs>(args?: SelectSubset<T, GpsLogFindFirstArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GpsLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogFindFirstOrThrowArgs} args - Arguments to find a GpsLog
     * @example
     * // Get one GpsLog
     * const gpsLog = await prisma.gpsLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GpsLogFindFirstOrThrowArgs>(args?: SelectSubset<T, GpsLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GpsLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GpsLogs
     * const gpsLogs = await prisma.gpsLog.findMany()
     * 
     * // Get first 10 GpsLogs
     * const gpsLogs = await prisma.gpsLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gpsLogWithIdOnly = await prisma.gpsLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GpsLogFindManyArgs>(args?: SelectSubset<T, GpsLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GpsLog.
     * @param {GpsLogCreateArgs} args - Arguments to create a GpsLog.
     * @example
     * // Create one GpsLog
     * const GpsLog = await prisma.gpsLog.create({
     *   data: {
     *     // ... data to create a GpsLog
     *   }
     * })
     * 
     */
    create<T extends GpsLogCreateArgs>(args: SelectSubset<T, GpsLogCreateArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GpsLogs.
     * @param {GpsLogCreateManyArgs} args - Arguments to create many GpsLogs.
     * @example
     * // Create many GpsLogs
     * const gpsLog = await prisma.gpsLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GpsLogCreateManyArgs>(args?: SelectSubset<T, GpsLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GpsLogs and returns the data saved in the database.
     * @param {GpsLogCreateManyAndReturnArgs} args - Arguments to create many GpsLogs.
     * @example
     * // Create many GpsLogs
     * const gpsLog = await prisma.gpsLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GpsLogs and only return the `id`
     * const gpsLogWithIdOnly = await prisma.gpsLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GpsLogCreateManyAndReturnArgs>(args?: SelectSubset<T, GpsLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GpsLog.
     * @param {GpsLogDeleteArgs} args - Arguments to delete one GpsLog.
     * @example
     * // Delete one GpsLog
     * const GpsLog = await prisma.gpsLog.delete({
     *   where: {
     *     // ... filter to delete one GpsLog
     *   }
     * })
     * 
     */
    delete<T extends GpsLogDeleteArgs>(args: SelectSubset<T, GpsLogDeleteArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GpsLog.
     * @param {GpsLogUpdateArgs} args - Arguments to update one GpsLog.
     * @example
     * // Update one GpsLog
     * const gpsLog = await prisma.gpsLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GpsLogUpdateArgs>(args: SelectSubset<T, GpsLogUpdateArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GpsLogs.
     * @param {GpsLogDeleteManyArgs} args - Arguments to filter GpsLogs to delete.
     * @example
     * // Delete a few GpsLogs
     * const { count } = await prisma.gpsLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GpsLogDeleteManyArgs>(args?: SelectSubset<T, GpsLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GpsLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GpsLogs
     * const gpsLog = await prisma.gpsLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GpsLogUpdateManyArgs>(args: SelectSubset<T, GpsLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GpsLogs and returns the data updated in the database.
     * @param {GpsLogUpdateManyAndReturnArgs} args - Arguments to update many GpsLogs.
     * @example
     * // Update many GpsLogs
     * const gpsLog = await prisma.gpsLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GpsLogs and only return the `id`
     * const gpsLogWithIdOnly = await prisma.gpsLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GpsLogUpdateManyAndReturnArgs>(args: SelectSubset<T, GpsLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GpsLog.
     * @param {GpsLogUpsertArgs} args - Arguments to update or create a GpsLog.
     * @example
     * // Update or create a GpsLog
     * const gpsLog = await prisma.gpsLog.upsert({
     *   create: {
     *     // ... data to create a GpsLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GpsLog we want to update
     *   }
     * })
     */
    upsert<T extends GpsLogUpsertArgs>(args: SelectSubset<T, GpsLogUpsertArgs<ExtArgs>>): Prisma__GpsLogClient<$Result.GetResult<Prisma.$GpsLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GpsLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogCountArgs} args - Arguments to filter GpsLogs to count.
     * @example
     * // Count the number of GpsLogs
     * const count = await prisma.gpsLog.count({
     *   where: {
     *     // ... the filter for the GpsLogs we want to count
     *   }
     * })
    **/
    count<T extends GpsLogCountArgs>(
      args?: Subset<T, GpsLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GpsLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GpsLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GpsLogAggregateArgs>(args: Subset<T, GpsLogAggregateArgs>): Prisma.PrismaPromise<GetGpsLogAggregateType<T>>

    /**
     * Group by GpsLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpsLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GpsLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GpsLogGroupByArgs['orderBy'] }
        : { orderBy?: GpsLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GpsLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGpsLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GpsLog model
   */
  readonly fields: GpsLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GpsLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GpsLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vessel<T extends GpsLog$vesselArgs<ExtArgs> = {}>(args?: Subset<T, GpsLog$vesselArgs<ExtArgs>>): Prisma__VesselClient<$Result.GetResult<Prisma.$VesselPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GpsLog model
   */
  interface GpsLogFieldRefs {
    readonly id: FieldRef<"GpsLog", 'String'>
    readonly vesselId: FieldRef<"GpsLog", 'String'>
    readonly mmsi: FieldRef<"GpsLog", 'String'>
    readonly utc_datetime: FieldRef<"GpsLog", 'DateTime'>
    readonly received_at: FieldRef<"GpsLog", 'DateTime'>
    readonly latitude: FieldRef<"GpsLog", 'Float'>
    readonly longitude: FieldRef<"GpsLog", 'Float'>
    readonly altitude_m: FieldRef<"GpsLog", 'Float'>
    readonly speed_kmh: FieldRef<"GpsLog", 'Float'>
    readonly heading_deg: FieldRef<"GpsLog", 'Float'>
    readonly satellites: FieldRef<"GpsLog", 'Int'>
    readonly hdop: FieldRef<"GpsLog", 'Float'>
    readonly fix_status: FieldRef<"GpsLog", 'Int'>
    readonly prns: FieldRef<"GpsLog", 'Int[]'>
    readonly snrs: FieldRef<"GpsLog", 'Float[]'>
  }
    

  // Custom InputTypes
  /**
   * GpsLog findUnique
   */
  export type GpsLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter, which GpsLog to fetch.
     */
    where: GpsLogWhereUniqueInput
  }

  /**
   * GpsLog findUniqueOrThrow
   */
  export type GpsLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter, which GpsLog to fetch.
     */
    where: GpsLogWhereUniqueInput
  }

  /**
   * GpsLog findFirst
   */
  export type GpsLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter, which GpsLog to fetch.
     */
    where?: GpsLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpsLogs to fetch.
     */
    orderBy?: GpsLogOrderByWithRelationInput | GpsLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GpsLogs.
     */
    cursor?: GpsLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpsLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpsLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GpsLogs.
     */
    distinct?: GpsLogScalarFieldEnum | GpsLogScalarFieldEnum[]
  }

  /**
   * GpsLog findFirstOrThrow
   */
  export type GpsLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter, which GpsLog to fetch.
     */
    where?: GpsLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpsLogs to fetch.
     */
    orderBy?: GpsLogOrderByWithRelationInput | GpsLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GpsLogs.
     */
    cursor?: GpsLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpsLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpsLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GpsLogs.
     */
    distinct?: GpsLogScalarFieldEnum | GpsLogScalarFieldEnum[]
  }

  /**
   * GpsLog findMany
   */
  export type GpsLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter, which GpsLogs to fetch.
     */
    where?: GpsLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpsLogs to fetch.
     */
    orderBy?: GpsLogOrderByWithRelationInput | GpsLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GpsLogs.
     */
    cursor?: GpsLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpsLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpsLogs.
     */
    skip?: number
    distinct?: GpsLogScalarFieldEnum | GpsLogScalarFieldEnum[]
  }

  /**
   * GpsLog create
   */
  export type GpsLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * The data needed to create a GpsLog.
     */
    data: XOR<GpsLogCreateInput, GpsLogUncheckedCreateInput>
  }

  /**
   * GpsLog createMany
   */
  export type GpsLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GpsLogs.
     */
    data: GpsLogCreateManyInput | GpsLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GpsLog createManyAndReturn
   */
  export type GpsLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * The data used to create many GpsLogs.
     */
    data: GpsLogCreateManyInput | GpsLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GpsLog update
   */
  export type GpsLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * The data needed to update a GpsLog.
     */
    data: XOR<GpsLogUpdateInput, GpsLogUncheckedUpdateInput>
    /**
     * Choose, which GpsLog to update.
     */
    where: GpsLogWhereUniqueInput
  }

  /**
   * GpsLog updateMany
   */
  export type GpsLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GpsLogs.
     */
    data: XOR<GpsLogUpdateManyMutationInput, GpsLogUncheckedUpdateManyInput>
    /**
     * Filter which GpsLogs to update
     */
    where?: GpsLogWhereInput
    /**
     * Limit how many GpsLogs to update.
     */
    limit?: number
  }

  /**
   * GpsLog updateManyAndReturn
   */
  export type GpsLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * The data used to update GpsLogs.
     */
    data: XOR<GpsLogUpdateManyMutationInput, GpsLogUncheckedUpdateManyInput>
    /**
     * Filter which GpsLogs to update
     */
    where?: GpsLogWhereInput
    /**
     * Limit how many GpsLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GpsLog upsert
   */
  export type GpsLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * The filter to search for the GpsLog to update in case it exists.
     */
    where: GpsLogWhereUniqueInput
    /**
     * In case the GpsLog found by the `where` argument doesn't exist, create a new GpsLog with this data.
     */
    create: XOR<GpsLogCreateInput, GpsLogUncheckedCreateInput>
    /**
     * In case the GpsLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GpsLogUpdateInput, GpsLogUncheckedUpdateInput>
  }

  /**
   * GpsLog delete
   */
  export type GpsLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
    /**
     * Filter which GpsLog to delete.
     */
    where: GpsLogWhereUniqueInput
  }

  /**
   * GpsLog deleteMany
   */
  export type GpsLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GpsLogs to delete
     */
    where?: GpsLogWhereInput
    /**
     * Limit how many GpsLogs to delete.
     */
    limit?: number
  }

  /**
   * GpsLog.vessel
   */
  export type GpsLog$vesselArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vessel
     */
    select?: VesselSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vessel
     */
    omit?: VesselOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VesselInclude<ExtArgs> | null
    where?: VesselWhereInput
  }

  /**
   * GpsLog without action
   */
  export type GpsLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GpsLog
     */
    select?: GpsLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GpsLog
     */
    omit?: GpsLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GpsLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    roleId: 'roleId',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VesselScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imo: 'imo',
    mmsi: 'mmsi',
    type: 'type',
    flag: 'flag',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VesselScalarFieldEnum = (typeof VesselScalarFieldEnum)[keyof typeof VesselScalarFieldEnum]


  export const TripScalarFieldEnum: {
    id: 'id',
    vesselId: 'vesselId',
    status: 'status',
    startTime: 'startTime',
    endTime: 'endTime',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TripScalarFieldEnum = (typeof TripScalarFieldEnum)[keyof typeof TripScalarFieldEnum]


  export const LocationPointScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    latitude: 'latitude',
    longitude: 'longitude',
    speed: 'speed',
    heading: 'heading',
    timestamp: 'timestamp'
  };

  export type LocationPointScalarFieldEnum = (typeof LocationPointScalarFieldEnum)[keyof typeof LocationPointScalarFieldEnum]


  export const ZoneScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ZoneScalarFieldEnum = (typeof ZoneScalarFieldEnum)[keyof typeof ZoneScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    vesselId: 'vesselId',
    tripId: 'tripId',
    zoneId: 'zoneId',
    type: 'type',
    severity: 'severity',
    status: 'status',
    message: 'message',
    timestamp: 'timestamp',
    resolvedAt: 'resolvedAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const TripStatusHistoryScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    status: 'status',
    changedBy: 'changedBy',
    timestamp: 'timestamp',
    remarks: 'remarks'
  };

  export type TripStatusHistoryScalarFieldEnum = (typeof TripStatusHistoryScalarFieldEnum)[keyof typeof TripStatusHistoryScalarFieldEnum]


  export const GpsLogScalarFieldEnum: {
    id: 'id',
    vesselId: 'vesselId',
    mmsi: 'mmsi',
    utc_datetime: 'utc_datetime',
    received_at: 'received_at',
    latitude: 'latitude',
    longitude: 'longitude',
    altitude_m: 'altitude_m',
    speed_kmh: 'speed_kmh',
    heading_deg: 'heading_deg',
    satellites: 'satellites',
    hdop: 'hdop',
    fix_status: 'fix_status',
    prns: 'prns',
    snrs: 'snrs'
  };

  export type GpsLogScalarFieldEnum = (typeof GpsLogScalarFieldEnum)[keyof typeof GpsLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'VesselType'
   */
  export type EnumVesselTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VesselType'>
    


  /**
   * Reference to a field of type 'VesselType[]'
   */
  export type ListEnumVesselTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VesselType[]'>
    


  /**
   * Reference to a field of type 'TripStatus'
   */
  export type EnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus'>
    


  /**
   * Reference to a field of type 'TripStatus[]'
   */
  export type ListEnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AlertSeverity'
   */
  export type EnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity'>
    


  /**
   * Reference to a field of type 'AlertSeverity[]'
   */
  export type ListEnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity[]'>
    


  /**
   * Reference to a field of type 'AlertStatus'
   */
  export type EnumAlertStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertStatus'>
    


  /**
   * Reference to a field of type 'AlertStatus[]'
   */
  export type ListEnumAlertStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: UuidFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    roleId?: UuidFilter<"User"> | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    statusChanges?: TripStatusHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    roleId?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: RoleOrderByWithRelationInput
    statusChanges?: TripStatusHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    roleId?: UuidFilter<"User"> | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    statusChanges?: TripStatusHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    roleId?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    roleId?: UuidWithAggregatesFilter<"User"> | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VesselWhereInput = {
    AND?: VesselWhereInput | VesselWhereInput[]
    OR?: VesselWhereInput[]
    NOT?: VesselWhereInput | VesselWhereInput[]
    id?: UuidFilter<"Vessel"> | string
    name?: StringFilter<"Vessel"> | string
    imo?: StringFilter<"Vessel"> | string
    mmsi?: StringFilter<"Vessel"> | string
    type?: EnumVesselTypeFilter<"Vessel"> | $Enums.VesselType
    flag?: StringNullableFilter<"Vessel"> | string | null
    deletedAt?: DateTimeNullableFilter<"Vessel"> | Date | string | null
    createdAt?: DateTimeFilter<"Vessel"> | Date | string
    updatedAt?: DateTimeFilter<"Vessel"> | Date | string
    trips?: TripListRelationFilter
    alerts?: AlertListRelationFilter
    gpsLogs?: GpsLogListRelationFilter
  }

  export type VesselOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imo?: SortOrder
    mmsi?: SortOrder
    type?: SortOrder
    flag?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trips?: TripOrderByRelationAggregateInput
    alerts?: AlertOrderByRelationAggregateInput
    gpsLogs?: GpsLogOrderByRelationAggregateInput
  }

  export type VesselWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    imo?: string
    mmsi?: string
    AND?: VesselWhereInput | VesselWhereInput[]
    OR?: VesselWhereInput[]
    NOT?: VesselWhereInput | VesselWhereInput[]
    name?: StringFilter<"Vessel"> | string
    type?: EnumVesselTypeFilter<"Vessel"> | $Enums.VesselType
    flag?: StringNullableFilter<"Vessel"> | string | null
    deletedAt?: DateTimeNullableFilter<"Vessel"> | Date | string | null
    createdAt?: DateTimeFilter<"Vessel"> | Date | string
    updatedAt?: DateTimeFilter<"Vessel"> | Date | string
    trips?: TripListRelationFilter
    alerts?: AlertListRelationFilter
    gpsLogs?: GpsLogListRelationFilter
  }, "id" | "imo" | "mmsi">

  export type VesselOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imo?: SortOrder
    mmsi?: SortOrder
    type?: SortOrder
    flag?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VesselCountOrderByAggregateInput
    _max?: VesselMaxOrderByAggregateInput
    _min?: VesselMinOrderByAggregateInput
  }

  export type VesselScalarWhereWithAggregatesInput = {
    AND?: VesselScalarWhereWithAggregatesInput | VesselScalarWhereWithAggregatesInput[]
    OR?: VesselScalarWhereWithAggregatesInput[]
    NOT?: VesselScalarWhereWithAggregatesInput | VesselScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Vessel"> | string
    name?: StringWithAggregatesFilter<"Vessel"> | string
    imo?: StringWithAggregatesFilter<"Vessel"> | string
    mmsi?: StringWithAggregatesFilter<"Vessel"> | string
    type?: EnumVesselTypeWithAggregatesFilter<"Vessel"> | $Enums.VesselType
    flag?: StringNullableWithAggregatesFilter<"Vessel"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Vessel"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vessel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vessel"> | Date | string
  }

  export type TripWhereInput = {
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    id?: UuidFilter<"Trip"> | string
    vesselId?: UuidFilter<"Trip"> | string
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    startTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Trip"> | Date | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
    vessel?: XOR<VesselScalarRelationFilter, VesselWhereInput>
    points?: LocationPointListRelationFilter
    alerts?: AlertListRelationFilter
    history?: TripStatusHistoryListRelationFilter
  }

  export type TripOrderByWithRelationInput = {
    id?: SortOrder
    vesselId?: SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vessel?: VesselOrderByWithRelationInput
    points?: LocationPointOrderByRelationAggregateInput
    alerts?: AlertOrderByRelationAggregateInput
    history?: TripStatusHistoryOrderByRelationAggregateInput
  }

  export type TripWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    vesselId?: UuidFilter<"Trip"> | string
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    startTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Trip"> | Date | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
    vessel?: XOR<VesselScalarRelationFilter, VesselWhereInput>
    points?: LocationPointListRelationFilter
    alerts?: AlertListRelationFilter
    history?: TripStatusHistoryListRelationFilter
  }, "id">

  export type TripOrderByWithAggregationInput = {
    id?: SortOrder
    vesselId?: SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TripCountOrderByAggregateInput
    _max?: TripMaxOrderByAggregateInput
    _min?: TripMinOrderByAggregateInput
  }

  export type TripScalarWhereWithAggregatesInput = {
    AND?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    OR?: TripScalarWhereWithAggregatesInput[]
    NOT?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Trip"> | string
    vesselId?: UuidWithAggregatesFilter<"Trip"> | string
    status?: EnumTripStatusWithAggregatesFilter<"Trip"> | $Enums.TripStatus
    startTime?: DateTimeNullableWithAggregatesFilter<"Trip"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"Trip"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Trip"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
  }

  export type LocationPointWhereInput = {
    AND?: LocationPointWhereInput | LocationPointWhereInput[]
    OR?: LocationPointWhereInput[]
    NOT?: LocationPointWhereInput | LocationPointWhereInput[]
    id?: UuidFilter<"LocationPoint"> | string
    tripId?: UuidFilter<"LocationPoint"> | string
    latitude?: FloatFilter<"LocationPoint"> | number
    longitude?: FloatFilter<"LocationPoint"> | number
    speed?: FloatNullableFilter<"LocationPoint"> | number | null
    heading?: FloatNullableFilter<"LocationPoint"> | number | null
    timestamp?: DateTimeFilter<"LocationPoint"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type LocationPointOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type LocationPointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationPointWhereInput | LocationPointWhereInput[]
    OR?: LocationPointWhereInput[]
    NOT?: LocationPointWhereInput | LocationPointWhereInput[]
    tripId?: UuidFilter<"LocationPoint"> | string
    latitude?: FloatFilter<"LocationPoint"> | number
    longitude?: FloatFilter<"LocationPoint"> | number
    speed?: FloatNullableFilter<"LocationPoint"> | number | null
    heading?: FloatNullableFilter<"LocationPoint"> | number | null
    timestamp?: DateTimeFilter<"LocationPoint"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type LocationPointOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: LocationPointCountOrderByAggregateInput
    _avg?: LocationPointAvgOrderByAggregateInput
    _max?: LocationPointMaxOrderByAggregateInput
    _min?: LocationPointMinOrderByAggregateInput
    _sum?: LocationPointSumOrderByAggregateInput
  }

  export type LocationPointScalarWhereWithAggregatesInput = {
    AND?: LocationPointScalarWhereWithAggregatesInput | LocationPointScalarWhereWithAggregatesInput[]
    OR?: LocationPointScalarWhereWithAggregatesInput[]
    NOT?: LocationPointScalarWhereWithAggregatesInput | LocationPointScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"LocationPoint"> | string
    tripId?: UuidWithAggregatesFilter<"LocationPoint"> | string
    latitude?: FloatWithAggregatesFilter<"LocationPoint"> | number
    longitude?: FloatWithAggregatesFilter<"LocationPoint"> | number
    speed?: FloatNullableWithAggregatesFilter<"LocationPoint"> | number | null
    heading?: FloatNullableWithAggregatesFilter<"LocationPoint"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"LocationPoint"> | Date | string
  }

  export type ZoneWhereInput = {
    AND?: ZoneWhereInput | ZoneWhereInput[]
    OR?: ZoneWhereInput[]
    NOT?: ZoneWhereInput | ZoneWhereInput[]
    id?: UuidFilter<"Zone"> | string
    name?: StringFilter<"Zone"> | string
    type?: StringFilter<"Zone"> | string
    createdAt?: DateTimeFilter<"Zone"> | Date | string
    updatedAt?: DateTimeFilter<"Zone"> | Date | string
    alerts?: AlertListRelationFilter
  }

  export type ZoneOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    alerts?: AlertOrderByRelationAggregateInput
  }

  export type ZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ZoneWhereInput | ZoneWhereInput[]
    OR?: ZoneWhereInput[]
    NOT?: ZoneWhereInput | ZoneWhereInput[]
    name?: StringFilter<"Zone"> | string
    type?: StringFilter<"Zone"> | string
    createdAt?: DateTimeFilter<"Zone"> | Date | string
    updatedAt?: DateTimeFilter<"Zone"> | Date | string
    alerts?: AlertListRelationFilter
  }, "id">

  export type ZoneOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ZoneCountOrderByAggregateInput
    _max?: ZoneMaxOrderByAggregateInput
    _min?: ZoneMinOrderByAggregateInput
  }

  export type ZoneScalarWhereWithAggregatesInput = {
    AND?: ZoneScalarWhereWithAggregatesInput | ZoneScalarWhereWithAggregatesInput[]
    OR?: ZoneScalarWhereWithAggregatesInput[]
    NOT?: ZoneScalarWhereWithAggregatesInput | ZoneScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Zone"> | string
    name?: StringWithAggregatesFilter<"Zone"> | string
    type?: StringWithAggregatesFilter<"Zone"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Zone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Zone"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: UuidFilter<"Alert"> | string
    vesselId?: UuidFilter<"Alert"> | string
    tripId?: UuidNullableFilter<"Alert"> | string | null
    zoneId?: UuidNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    message?: StringFilter<"Alert"> | string
    timestamp?: DateTimeFilter<"Alert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    vessel?: XOR<VesselScalarRelationFilter, VesselWhereInput>
    trip?: XOR<TripNullableScalarRelationFilter, TripWhereInput> | null
    zone?: XOR<ZoneNullableScalarRelationFilter, ZoneWhereInput> | null
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    vesselId?: SortOrder
    tripId?: SortOrderInput | SortOrder
    zoneId?: SortOrderInput | SortOrder
    type?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    vessel?: VesselOrderByWithRelationInput
    trip?: TripOrderByWithRelationInput
    zone?: ZoneOrderByWithRelationInput
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    vesselId?: UuidFilter<"Alert"> | string
    tripId?: UuidNullableFilter<"Alert"> | string | null
    zoneId?: UuidNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    message?: StringFilter<"Alert"> | string
    timestamp?: DateTimeFilter<"Alert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    vessel?: XOR<VesselScalarRelationFilter, VesselWhereInput>
    trip?: XOR<TripNullableScalarRelationFilter, TripWhereInput> | null
    zone?: XOR<ZoneNullableScalarRelationFilter, ZoneWhereInput> | null
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    vesselId?: SortOrder
    tripId?: SortOrderInput | SortOrder
    zoneId?: SortOrderInput | SortOrder
    type?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: AlertCountOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Alert"> | string
    vesselId?: UuidWithAggregatesFilter<"Alert"> | string
    tripId?: UuidNullableWithAggregatesFilter<"Alert"> | string | null
    zoneId?: UuidNullableWithAggregatesFilter<"Alert"> | string | null
    type?: StringWithAggregatesFilter<"Alert"> | string
    severity?: EnumAlertSeverityWithAggregatesFilter<"Alert"> | $Enums.AlertSeverity
    status?: EnumAlertStatusWithAggregatesFilter<"Alert"> | $Enums.AlertStatus
    message?: StringWithAggregatesFilter<"Alert"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
  }

  export type TripStatusHistoryWhereInput = {
    AND?: TripStatusHistoryWhereInput | TripStatusHistoryWhereInput[]
    OR?: TripStatusHistoryWhereInput[]
    NOT?: TripStatusHistoryWhereInput | TripStatusHistoryWhereInput[]
    id?: UuidFilter<"TripStatusHistory"> | string
    tripId?: UuidFilter<"TripStatusHistory"> | string
    status?: EnumTripStatusFilter<"TripStatusHistory"> | $Enums.TripStatus
    changedBy?: UuidNullableFilter<"TripStatusHistory"> | string | null
    timestamp?: DateTimeFilter<"TripStatusHistory"> | Date | string
    remarks?: StringNullableFilter<"TripStatusHistory"> | string | null
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TripStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    status?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    remarks?: SortOrderInput | SortOrder
    trip?: TripOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TripStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TripStatusHistoryWhereInput | TripStatusHistoryWhereInput[]
    OR?: TripStatusHistoryWhereInput[]
    NOT?: TripStatusHistoryWhereInput | TripStatusHistoryWhereInput[]
    tripId?: UuidFilter<"TripStatusHistory"> | string
    status?: EnumTripStatusFilter<"TripStatusHistory"> | $Enums.TripStatus
    changedBy?: UuidNullableFilter<"TripStatusHistory"> | string | null
    timestamp?: DateTimeFilter<"TripStatusHistory"> | Date | string
    remarks?: StringNullableFilter<"TripStatusHistory"> | string | null
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TripStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    status?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: TripStatusHistoryCountOrderByAggregateInput
    _max?: TripStatusHistoryMaxOrderByAggregateInput
    _min?: TripStatusHistoryMinOrderByAggregateInput
  }

  export type TripStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: TripStatusHistoryScalarWhereWithAggregatesInput | TripStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: TripStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: TripStatusHistoryScalarWhereWithAggregatesInput | TripStatusHistoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TripStatusHistory"> | string
    tripId?: UuidWithAggregatesFilter<"TripStatusHistory"> | string
    status?: EnumTripStatusWithAggregatesFilter<"TripStatusHistory"> | $Enums.TripStatus
    changedBy?: UuidNullableWithAggregatesFilter<"TripStatusHistory"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"TripStatusHistory"> | Date | string
    remarks?: StringNullableWithAggregatesFilter<"TripStatusHistory"> | string | null
  }

  export type GpsLogWhereInput = {
    AND?: GpsLogWhereInput | GpsLogWhereInput[]
    OR?: GpsLogWhereInput[]
    NOT?: GpsLogWhereInput | GpsLogWhereInput[]
    id?: UuidFilter<"GpsLog"> | string
    vesselId?: UuidNullableFilter<"GpsLog"> | string | null
    mmsi?: StringNullableFilter<"GpsLog"> | string | null
    utc_datetime?: DateTimeFilter<"GpsLog"> | Date | string
    received_at?: DateTimeFilter<"GpsLog"> | Date | string
    latitude?: FloatFilter<"GpsLog"> | number
    longitude?: FloatFilter<"GpsLog"> | number
    altitude_m?: FloatNullableFilter<"GpsLog"> | number | null
    speed_kmh?: FloatNullableFilter<"GpsLog"> | number | null
    heading_deg?: FloatNullableFilter<"GpsLog"> | number | null
    satellites?: IntNullableFilter<"GpsLog"> | number | null
    hdop?: FloatNullableFilter<"GpsLog"> | number | null
    fix_status?: IntNullableFilter<"GpsLog"> | number | null
    prns?: IntNullableListFilter<"GpsLog">
    snrs?: FloatNullableListFilter<"GpsLog">
    vessel?: XOR<VesselNullableScalarRelationFilter, VesselWhereInput> | null
  }

  export type GpsLogOrderByWithRelationInput = {
    id?: SortOrder
    vesselId?: SortOrderInput | SortOrder
    mmsi?: SortOrderInput | SortOrder
    utc_datetime?: SortOrder
    received_at?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrderInput | SortOrder
    speed_kmh?: SortOrderInput | SortOrder
    heading_deg?: SortOrderInput | SortOrder
    satellites?: SortOrderInput | SortOrder
    hdop?: SortOrderInput | SortOrder
    fix_status?: SortOrderInput | SortOrder
    prns?: SortOrder
    snrs?: SortOrder
    vessel?: VesselOrderByWithRelationInput
  }

  export type GpsLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GpsLogWhereInput | GpsLogWhereInput[]
    OR?: GpsLogWhereInput[]
    NOT?: GpsLogWhereInput | GpsLogWhereInput[]
    vesselId?: UuidNullableFilter<"GpsLog"> | string | null
    mmsi?: StringNullableFilter<"GpsLog"> | string | null
    utc_datetime?: DateTimeFilter<"GpsLog"> | Date | string
    received_at?: DateTimeFilter<"GpsLog"> | Date | string
    latitude?: FloatFilter<"GpsLog"> | number
    longitude?: FloatFilter<"GpsLog"> | number
    altitude_m?: FloatNullableFilter<"GpsLog"> | number | null
    speed_kmh?: FloatNullableFilter<"GpsLog"> | number | null
    heading_deg?: FloatNullableFilter<"GpsLog"> | number | null
    satellites?: IntNullableFilter<"GpsLog"> | number | null
    hdop?: FloatNullableFilter<"GpsLog"> | number | null
    fix_status?: IntNullableFilter<"GpsLog"> | number | null
    prns?: IntNullableListFilter<"GpsLog">
    snrs?: FloatNullableListFilter<"GpsLog">
    vessel?: XOR<VesselNullableScalarRelationFilter, VesselWhereInput> | null
  }, "id">

  export type GpsLogOrderByWithAggregationInput = {
    id?: SortOrder
    vesselId?: SortOrderInput | SortOrder
    mmsi?: SortOrderInput | SortOrder
    utc_datetime?: SortOrder
    received_at?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrderInput | SortOrder
    speed_kmh?: SortOrderInput | SortOrder
    heading_deg?: SortOrderInput | SortOrder
    satellites?: SortOrderInput | SortOrder
    hdop?: SortOrderInput | SortOrder
    fix_status?: SortOrderInput | SortOrder
    prns?: SortOrder
    snrs?: SortOrder
    _count?: GpsLogCountOrderByAggregateInput
    _avg?: GpsLogAvgOrderByAggregateInput
    _max?: GpsLogMaxOrderByAggregateInput
    _min?: GpsLogMinOrderByAggregateInput
    _sum?: GpsLogSumOrderByAggregateInput
  }

  export type GpsLogScalarWhereWithAggregatesInput = {
    AND?: GpsLogScalarWhereWithAggregatesInput | GpsLogScalarWhereWithAggregatesInput[]
    OR?: GpsLogScalarWhereWithAggregatesInput[]
    NOT?: GpsLogScalarWhereWithAggregatesInput | GpsLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"GpsLog"> | string
    vesselId?: UuidNullableWithAggregatesFilter<"GpsLog"> | string | null
    mmsi?: StringNullableWithAggregatesFilter<"GpsLog"> | string | null
    utc_datetime?: DateTimeWithAggregatesFilter<"GpsLog"> | Date | string
    received_at?: DateTimeWithAggregatesFilter<"GpsLog"> | Date | string
    latitude?: FloatWithAggregatesFilter<"GpsLog"> | number
    longitude?: FloatWithAggregatesFilter<"GpsLog"> | number
    altitude_m?: FloatNullableWithAggregatesFilter<"GpsLog"> | number | null
    speed_kmh?: FloatNullableWithAggregatesFilter<"GpsLog"> | number | null
    heading_deg?: FloatNullableWithAggregatesFilter<"GpsLog"> | number | null
    satellites?: IntNullableWithAggregatesFilter<"GpsLog"> | number | null
    hdop?: FloatNullableWithAggregatesFilter<"GpsLog"> | number | null
    fix_status?: IntNullableWithAggregatesFilter<"GpsLog"> | number | null
    prns?: IntNullableListFilter<"GpsLog">
    snrs?: FloatNullableListFilter<"GpsLog">
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
    statusChanges?: TripStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    roleId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusChanges?: TripStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    statusChanges?: TripStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusChanges?: TripStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    roleId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VesselCreateInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripCreateNestedManyWithoutVesselInput
    alerts?: AlertCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogCreateNestedManyWithoutVesselInput
  }

  export type VesselUncheckedCreateInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripUncheckedCreateNestedManyWithoutVesselInput
    alerts?: AlertUncheckedCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogUncheckedCreateNestedManyWithoutVesselInput
  }

  export type VesselUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUpdateManyWithoutVesselNestedInput
    alerts?: AlertUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUpdateManyWithoutVesselNestedInput
  }

  export type VesselUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUncheckedUpdateManyWithoutVesselNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUncheckedUpdateManyWithoutVesselNestedInput
  }

  export type VesselCreateManyInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VesselUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VesselUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vessel: VesselCreateNestedOneWithoutTripsInput
    points?: LocationPointCreateNestedManyWithoutTripInput
    alerts?: AlertCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateInput = {
    id?: string
    vesselId: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    points?: LocationPointUncheckedCreateNestedManyWithoutTripInput
    alerts?: AlertUncheckedCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vessel?: VesselUpdateOneRequiredWithoutTripsNestedInput
    points?: LocationPointUpdateManyWithoutTripNestedInput
    alerts?: AlertUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: LocationPointUncheckedUpdateManyWithoutTripNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateManyInput = {
    id?: string
    vesselId: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationPointCreateInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
    trip: TripCreateNestedOneWithoutPointsInput
  }

  export type LocationPointUncheckedCreateInput = {
    id?: string
    tripId: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationPointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    trip?: TripUpdateOneRequiredWithoutPointsNestedInput
  }

  export type LocationPointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationPointCreateManyInput = {
    id?: string
    tripId: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationPointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationPointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUpdateManyWithoutZoneNestedInput
  }

  export type ZoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUncheckedUpdateManyWithoutZoneNestedInput
  }

  export type ZoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    id?: string
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    vessel: VesselCreateNestedOneWithoutAlertsInput
    trip?: TripCreateNestedOneWithoutAlertsInput
    zone?: ZoneCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateInput = {
    id?: string
    vesselId: string
    tripId?: string | null
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vessel?: VesselUpdateOneRequiredWithoutAlertsNestedInput
    trip?: TripUpdateOneWithoutAlertsNestedInput
    zone?: ZoneUpdateOneWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertCreateManyInput = {
    id?: string
    vesselId: string
    tripId?: string | null
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TripStatusHistoryCreateInput = {
    id?: string
    status: $Enums.TripStatus
    timestamp?: Date | string
    remarks?: string | null
    trip: TripCreateNestedOneWithoutHistoryInput
    user?: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type TripStatusHistoryUncheckedCreateInput = {
    id?: string
    tripId: string
    status: $Enums.TripStatus
    changedBy?: string | null
    timestamp?: Date | string
    remarks?: string | null
  }

  export type TripStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    trip?: TripUpdateOneRequiredWithoutHistoryNestedInput
    user?: UserUpdateOneWithoutStatusChangesNestedInput
  }

  export type TripStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripStatusHistoryCreateManyInput = {
    id?: string
    tripId: string
    status: $Enums.TripStatus
    changedBy?: string | null
    timestamp?: Date | string
    remarks?: string | null
  }

  export type TripStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GpsLogCreateInput = {
    id?: string
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
    vessel?: VesselCreateNestedOneWithoutGpsLogsInput
  }

  export type GpsLogUncheckedCreateInput = {
    id?: string
    vesselId?: string | null
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
  }

  export type GpsLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
    vessel?: VesselUpdateOneWithoutGpsLogsNestedInput
  }

  export type GpsLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: NullableStringFieldUpdateOperationsInput | string | null
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type GpsLogCreateManyInput = {
    id?: string
    vesselId?: string | null
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
  }

  export type GpsLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type GpsLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: NullableStringFieldUpdateOperationsInput | string | null
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type TripStatusHistoryListRelationFilter = {
    every?: TripStatusHistoryWhereInput
    some?: TripStatusHistoryWhereInput
    none?: TripStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TripStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    roleId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    roleId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    roleId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumVesselTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VesselType | EnumVesselTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVesselTypeFilter<$PrismaModel> | $Enums.VesselType
  }

  export type TripListRelationFilter = {
    every?: TripWhereInput
    some?: TripWhereInput
    none?: TripWhereInput
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type GpsLogListRelationFilter = {
    every?: GpsLogWhereInput
    some?: GpsLogWhereInput
    none?: GpsLogWhereInput
  }

  export type TripOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GpsLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VesselCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imo?: SortOrder
    mmsi?: SortOrder
    type?: SortOrder
    flag?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VesselMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imo?: SortOrder
    mmsi?: SortOrder
    type?: SortOrder
    flag?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VesselMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imo?: SortOrder
    mmsi?: SortOrder
    type?: SortOrder
    flag?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVesselTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VesselType | EnumVesselTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVesselTypeWithAggregatesFilter<$PrismaModel> | $Enums.VesselType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVesselTypeFilter<$PrismaModel>
    _max?: NestedEnumVesselTypeFilter<$PrismaModel>
  }

  export type EnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type VesselScalarRelationFilter = {
    is?: VesselWhereInput
    isNot?: VesselWhereInput
  }

  export type LocationPointListRelationFilter = {
    every?: LocationPointWhereInput
    some?: LocationPointWhereInput
    none?: LocationPointWhereInput
  }

  export type LocationPointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripCountOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripMaxOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripMinOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TripScalarRelationFilter = {
    is?: TripWhereInput
    isNot?: TripWhereInput
  }

  export type LocationPointCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationPointAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type LocationPointMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationPointMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationPointSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ZoneCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ZoneMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ZoneMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type EnumAlertStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertStatusFilter<$PrismaModel> | $Enums.AlertStatus
  }

  export type TripNullableScalarRelationFilter = {
    is?: TripWhereInput | null
    isNot?: TripWhereInput | null
  }

  export type ZoneNullableScalarRelationFilter = {
    is?: ZoneWhereInput | null
    isNot?: ZoneWhereInput | null
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    tripId?: SortOrder
    zoneId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    tripId?: SortOrder
    zoneId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    tripId?: SortOrder
    zoneId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type EnumAlertStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel> | $Enums.AlertStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertStatusFilter<$PrismaModel>
    _max?: NestedEnumAlertStatusFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TripStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    status?: SortOrder
    changedBy?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }

  export type TripStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    status?: SortOrder
    changedBy?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }

  export type TripStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    status?: SortOrder
    changedBy?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type VesselNullableScalarRelationFilter = {
    is?: VesselWhereInput | null
    isNot?: VesselWhereInput | null
  }

  export type GpsLogCountOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    mmsi?: SortOrder
    utc_datetime?: SortOrder
    received_at?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrder
    speed_kmh?: SortOrder
    heading_deg?: SortOrder
    satellites?: SortOrder
    hdop?: SortOrder
    fix_status?: SortOrder
    prns?: SortOrder
    snrs?: SortOrder
  }

  export type GpsLogAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrder
    speed_kmh?: SortOrder
    heading_deg?: SortOrder
    satellites?: SortOrder
    hdop?: SortOrder
    fix_status?: SortOrder
    prns?: SortOrder
    snrs?: SortOrder
  }

  export type GpsLogMaxOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    mmsi?: SortOrder
    utc_datetime?: SortOrder
    received_at?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrder
    speed_kmh?: SortOrder
    heading_deg?: SortOrder
    satellites?: SortOrder
    hdop?: SortOrder
    fix_status?: SortOrder
  }

  export type GpsLogMinOrderByAggregateInput = {
    id?: SortOrder
    vesselId?: SortOrder
    mmsi?: SortOrder
    utc_datetime?: SortOrder
    received_at?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrder
    speed_kmh?: SortOrder
    heading_deg?: SortOrder
    satellites?: SortOrder
    hdop?: SortOrder
    fix_status?: SortOrder
  }

  export type GpsLogSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude_m?: SortOrder
    speed_kmh?: SortOrder
    heading_deg?: SortOrder
    satellites?: SortOrder
    hdop?: SortOrder
    fix_status?: SortOrder
    prns?: SortOrder
    snrs?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type TripStatusHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput> | TripStatusHistoryCreateWithoutUserInput[] | TripStatusHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutUserInput | TripStatusHistoryCreateOrConnectWithoutUserInput[]
    createMany?: TripStatusHistoryCreateManyUserInputEnvelope
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
  }

  export type TripStatusHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput> | TripStatusHistoryCreateWithoutUserInput[] | TripStatusHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutUserInput | TripStatusHistoryCreateOrConnectWithoutUserInput[]
    createMany?: TripStatusHistoryCreateManyUserInputEnvelope
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type TripStatusHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput> | TripStatusHistoryCreateWithoutUserInput[] | TripStatusHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutUserInput | TripStatusHistoryCreateOrConnectWithoutUserInput[]
    upsert?: TripStatusHistoryUpsertWithWhereUniqueWithoutUserInput | TripStatusHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TripStatusHistoryCreateManyUserInputEnvelope
    set?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    disconnect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    delete?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    update?: TripStatusHistoryUpdateWithWhereUniqueWithoutUserInput | TripStatusHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TripStatusHistoryUpdateManyWithWhereWithoutUserInput | TripStatusHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
  }

  export type TripStatusHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput> | TripStatusHistoryCreateWithoutUserInput[] | TripStatusHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutUserInput | TripStatusHistoryCreateOrConnectWithoutUserInput[]
    upsert?: TripStatusHistoryUpsertWithWhereUniqueWithoutUserInput | TripStatusHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TripStatusHistoryCreateManyUserInputEnvelope
    set?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    disconnect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    delete?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    update?: TripStatusHistoryUpdateWithWhereUniqueWithoutUserInput | TripStatusHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TripStatusHistoryUpdateManyWithWhereWithoutUserInput | TripStatusHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
  }

  export type TripCreateNestedManyWithoutVesselInput = {
    create?: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput> | TripCreateWithoutVesselInput[] | TripUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVesselInput | TripCreateOrConnectWithoutVesselInput[]
    createMany?: TripCreateManyVesselInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type AlertCreateNestedManyWithoutVesselInput = {
    create?: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput> | AlertCreateWithoutVesselInput[] | AlertUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutVesselInput | AlertCreateOrConnectWithoutVesselInput[]
    createMany?: AlertCreateManyVesselInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type GpsLogCreateNestedManyWithoutVesselInput = {
    create?: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput> | GpsLogCreateWithoutVesselInput[] | GpsLogUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: GpsLogCreateOrConnectWithoutVesselInput | GpsLogCreateOrConnectWithoutVesselInput[]
    createMany?: GpsLogCreateManyVesselInputEnvelope
    connect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
  }

  export type TripUncheckedCreateNestedManyWithoutVesselInput = {
    create?: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput> | TripCreateWithoutVesselInput[] | TripUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVesselInput | TripCreateOrConnectWithoutVesselInput[]
    createMany?: TripCreateManyVesselInputEnvelope
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutVesselInput = {
    create?: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput> | AlertCreateWithoutVesselInput[] | AlertUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutVesselInput | AlertCreateOrConnectWithoutVesselInput[]
    createMany?: AlertCreateManyVesselInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type GpsLogUncheckedCreateNestedManyWithoutVesselInput = {
    create?: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput> | GpsLogCreateWithoutVesselInput[] | GpsLogUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: GpsLogCreateOrConnectWithoutVesselInput | GpsLogCreateOrConnectWithoutVesselInput[]
    createMany?: GpsLogCreateManyVesselInputEnvelope
    connect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
  }

  export type EnumVesselTypeFieldUpdateOperationsInput = {
    set?: $Enums.VesselType
  }

  export type TripUpdateManyWithoutVesselNestedInput = {
    create?: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput> | TripCreateWithoutVesselInput[] | TripUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVesselInput | TripCreateOrConnectWithoutVesselInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutVesselInput | TripUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: TripCreateManyVesselInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutVesselInput | TripUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: TripUpdateManyWithWhereWithoutVesselInput | TripUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type AlertUpdateManyWithoutVesselNestedInput = {
    create?: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput> | AlertCreateWithoutVesselInput[] | AlertUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutVesselInput | AlertCreateOrConnectWithoutVesselInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutVesselInput | AlertUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: AlertCreateManyVesselInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutVesselInput | AlertUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutVesselInput | AlertUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type GpsLogUpdateManyWithoutVesselNestedInput = {
    create?: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput> | GpsLogCreateWithoutVesselInput[] | GpsLogUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: GpsLogCreateOrConnectWithoutVesselInput | GpsLogCreateOrConnectWithoutVesselInput[]
    upsert?: GpsLogUpsertWithWhereUniqueWithoutVesselInput | GpsLogUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: GpsLogCreateManyVesselInputEnvelope
    set?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    disconnect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    delete?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    connect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    update?: GpsLogUpdateWithWhereUniqueWithoutVesselInput | GpsLogUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: GpsLogUpdateManyWithWhereWithoutVesselInput | GpsLogUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: GpsLogScalarWhereInput | GpsLogScalarWhereInput[]
  }

  export type TripUncheckedUpdateManyWithoutVesselNestedInput = {
    create?: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput> | TripCreateWithoutVesselInput[] | TripUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: TripCreateOrConnectWithoutVesselInput | TripCreateOrConnectWithoutVesselInput[]
    upsert?: TripUpsertWithWhereUniqueWithoutVesselInput | TripUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: TripCreateManyVesselInputEnvelope
    set?: TripWhereUniqueInput | TripWhereUniqueInput[]
    disconnect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    delete?: TripWhereUniqueInput | TripWhereUniqueInput[]
    connect?: TripWhereUniqueInput | TripWhereUniqueInput[]
    update?: TripUpdateWithWhereUniqueWithoutVesselInput | TripUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: TripUpdateManyWithWhereWithoutVesselInput | TripUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: TripScalarWhereInput | TripScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutVesselNestedInput = {
    create?: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput> | AlertCreateWithoutVesselInput[] | AlertUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutVesselInput | AlertCreateOrConnectWithoutVesselInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutVesselInput | AlertUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: AlertCreateManyVesselInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutVesselInput | AlertUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutVesselInput | AlertUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type GpsLogUncheckedUpdateManyWithoutVesselNestedInput = {
    create?: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput> | GpsLogCreateWithoutVesselInput[] | GpsLogUncheckedCreateWithoutVesselInput[]
    connectOrCreate?: GpsLogCreateOrConnectWithoutVesselInput | GpsLogCreateOrConnectWithoutVesselInput[]
    upsert?: GpsLogUpsertWithWhereUniqueWithoutVesselInput | GpsLogUpsertWithWhereUniqueWithoutVesselInput[]
    createMany?: GpsLogCreateManyVesselInputEnvelope
    set?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    disconnect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    delete?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    connect?: GpsLogWhereUniqueInput | GpsLogWhereUniqueInput[]
    update?: GpsLogUpdateWithWhereUniqueWithoutVesselInput | GpsLogUpdateWithWhereUniqueWithoutVesselInput[]
    updateMany?: GpsLogUpdateManyWithWhereWithoutVesselInput | GpsLogUpdateManyWithWhereWithoutVesselInput[]
    deleteMany?: GpsLogScalarWhereInput | GpsLogScalarWhereInput[]
  }

  export type VesselCreateNestedOneWithoutTripsInput = {
    create?: XOR<VesselCreateWithoutTripsInput, VesselUncheckedCreateWithoutTripsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutTripsInput
    connect?: VesselWhereUniqueInput
  }

  export type LocationPointCreateNestedManyWithoutTripInput = {
    create?: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput> | LocationPointCreateWithoutTripInput[] | LocationPointUncheckedCreateWithoutTripInput[]
    connectOrCreate?: LocationPointCreateOrConnectWithoutTripInput | LocationPointCreateOrConnectWithoutTripInput[]
    createMany?: LocationPointCreateManyTripInputEnvelope
    connect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
  }

  export type AlertCreateNestedManyWithoutTripInput = {
    create?: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput> | AlertCreateWithoutTripInput[] | AlertUncheckedCreateWithoutTripInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutTripInput | AlertCreateOrConnectWithoutTripInput[]
    createMany?: AlertCreateManyTripInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type TripStatusHistoryCreateNestedManyWithoutTripInput = {
    create?: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput> | TripStatusHistoryCreateWithoutTripInput[] | TripStatusHistoryUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutTripInput | TripStatusHistoryCreateOrConnectWithoutTripInput[]
    createMany?: TripStatusHistoryCreateManyTripInputEnvelope
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
  }

  export type LocationPointUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput> | LocationPointCreateWithoutTripInput[] | LocationPointUncheckedCreateWithoutTripInput[]
    connectOrCreate?: LocationPointCreateOrConnectWithoutTripInput | LocationPointCreateOrConnectWithoutTripInput[]
    createMany?: LocationPointCreateManyTripInputEnvelope
    connect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput> | AlertCreateWithoutTripInput[] | AlertUncheckedCreateWithoutTripInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutTripInput | AlertCreateOrConnectWithoutTripInput[]
    createMany?: AlertCreateManyTripInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type TripStatusHistoryUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput> | TripStatusHistoryCreateWithoutTripInput[] | TripStatusHistoryUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutTripInput | TripStatusHistoryCreateOrConnectWithoutTripInput[]
    createMany?: TripStatusHistoryCreateManyTripInputEnvelope
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
  }

  export type EnumTripStatusFieldUpdateOperationsInput = {
    set?: $Enums.TripStatus
  }

  export type VesselUpdateOneRequiredWithoutTripsNestedInput = {
    create?: XOR<VesselCreateWithoutTripsInput, VesselUncheckedCreateWithoutTripsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutTripsInput
    upsert?: VesselUpsertWithoutTripsInput
    connect?: VesselWhereUniqueInput
    update?: XOR<XOR<VesselUpdateToOneWithWhereWithoutTripsInput, VesselUpdateWithoutTripsInput>, VesselUncheckedUpdateWithoutTripsInput>
  }

  export type LocationPointUpdateManyWithoutTripNestedInput = {
    create?: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput> | LocationPointCreateWithoutTripInput[] | LocationPointUncheckedCreateWithoutTripInput[]
    connectOrCreate?: LocationPointCreateOrConnectWithoutTripInput | LocationPointCreateOrConnectWithoutTripInput[]
    upsert?: LocationPointUpsertWithWhereUniqueWithoutTripInput | LocationPointUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: LocationPointCreateManyTripInputEnvelope
    set?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    disconnect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    delete?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    connect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    update?: LocationPointUpdateWithWhereUniqueWithoutTripInput | LocationPointUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: LocationPointUpdateManyWithWhereWithoutTripInput | LocationPointUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: LocationPointScalarWhereInput | LocationPointScalarWhereInput[]
  }

  export type AlertUpdateManyWithoutTripNestedInput = {
    create?: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput> | AlertCreateWithoutTripInput[] | AlertUncheckedCreateWithoutTripInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutTripInput | AlertCreateOrConnectWithoutTripInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutTripInput | AlertUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: AlertCreateManyTripInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutTripInput | AlertUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutTripInput | AlertUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type TripStatusHistoryUpdateManyWithoutTripNestedInput = {
    create?: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput> | TripStatusHistoryCreateWithoutTripInput[] | TripStatusHistoryUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutTripInput | TripStatusHistoryCreateOrConnectWithoutTripInput[]
    upsert?: TripStatusHistoryUpsertWithWhereUniqueWithoutTripInput | TripStatusHistoryUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: TripStatusHistoryCreateManyTripInputEnvelope
    set?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    disconnect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    delete?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    update?: TripStatusHistoryUpdateWithWhereUniqueWithoutTripInput | TripStatusHistoryUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: TripStatusHistoryUpdateManyWithWhereWithoutTripInput | TripStatusHistoryUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
  }

  export type LocationPointUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput> | LocationPointCreateWithoutTripInput[] | LocationPointUncheckedCreateWithoutTripInput[]
    connectOrCreate?: LocationPointCreateOrConnectWithoutTripInput | LocationPointCreateOrConnectWithoutTripInput[]
    upsert?: LocationPointUpsertWithWhereUniqueWithoutTripInput | LocationPointUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: LocationPointCreateManyTripInputEnvelope
    set?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    disconnect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    delete?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    connect?: LocationPointWhereUniqueInput | LocationPointWhereUniqueInput[]
    update?: LocationPointUpdateWithWhereUniqueWithoutTripInput | LocationPointUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: LocationPointUpdateManyWithWhereWithoutTripInput | LocationPointUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: LocationPointScalarWhereInput | LocationPointScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput> | AlertCreateWithoutTripInput[] | AlertUncheckedCreateWithoutTripInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutTripInput | AlertCreateOrConnectWithoutTripInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutTripInput | AlertUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: AlertCreateManyTripInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutTripInput | AlertUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutTripInput | AlertUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type TripStatusHistoryUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput> | TripStatusHistoryCreateWithoutTripInput[] | TripStatusHistoryUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripStatusHistoryCreateOrConnectWithoutTripInput | TripStatusHistoryCreateOrConnectWithoutTripInput[]
    upsert?: TripStatusHistoryUpsertWithWhereUniqueWithoutTripInput | TripStatusHistoryUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: TripStatusHistoryCreateManyTripInputEnvelope
    set?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    disconnect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    delete?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    connect?: TripStatusHistoryWhereUniqueInput | TripStatusHistoryWhereUniqueInput[]
    update?: TripStatusHistoryUpdateWithWhereUniqueWithoutTripInput | TripStatusHistoryUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: TripStatusHistoryUpdateManyWithWhereWithoutTripInput | TripStatusHistoryUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
  }

  export type TripCreateNestedOneWithoutPointsInput = {
    create?: XOR<TripCreateWithoutPointsInput, TripUncheckedCreateWithoutPointsInput>
    connectOrCreate?: TripCreateOrConnectWithoutPointsInput
    connect?: TripWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TripUpdateOneRequiredWithoutPointsNestedInput = {
    create?: XOR<TripCreateWithoutPointsInput, TripUncheckedCreateWithoutPointsInput>
    connectOrCreate?: TripCreateOrConnectWithoutPointsInput
    upsert?: TripUpsertWithoutPointsInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutPointsInput, TripUpdateWithoutPointsInput>, TripUncheckedUpdateWithoutPointsInput>
  }

  export type AlertUpdateManyWithoutZoneNestedInput = {
    create?: XOR<AlertCreateWithoutZoneInput, AlertUncheckedCreateWithoutZoneInput> | AlertCreateWithoutZoneInput[] | AlertUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutZoneInput | AlertCreateOrConnectWithoutZoneInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutZoneInput | AlertUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: AlertCreateManyZoneInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutZoneInput | AlertUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutZoneInput | AlertUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutZoneNestedInput = {
    create?: XOR<AlertCreateWithoutZoneInput, AlertUncheckedCreateWithoutZoneInput> | AlertCreateWithoutZoneInput[] | AlertUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutZoneInput | AlertCreateOrConnectWithoutZoneInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutZoneInput | AlertUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: AlertCreateManyZoneInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutZoneInput | AlertUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutZoneInput | AlertUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type VesselCreateNestedOneWithoutAlertsInput = {
    create?: XOR<VesselCreateWithoutAlertsInput, VesselUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutAlertsInput
    connect?: VesselWhereUniqueInput
  }

  export type TripCreateNestedOneWithoutAlertsInput = {
    create?: XOR<TripCreateWithoutAlertsInput, TripUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: TripCreateOrConnectWithoutAlertsInput
    connect?: TripWhereUniqueInput
  }

  export type ZoneCreateNestedOneWithoutAlertsInput = {
    connect?: ZoneWhereUniqueInput
  }

  export type EnumAlertSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AlertSeverity
  }

  export type EnumAlertStatusFieldUpdateOperationsInput = {
    set?: $Enums.AlertStatus
  }

  export type VesselUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<VesselCreateWithoutAlertsInput, VesselUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutAlertsInput
    upsert?: VesselUpsertWithoutAlertsInput
    connect?: VesselWhereUniqueInput
    update?: XOR<XOR<VesselUpdateToOneWithWhereWithoutAlertsInput, VesselUpdateWithoutAlertsInput>, VesselUncheckedUpdateWithoutAlertsInput>
  }

  export type TripUpdateOneWithoutAlertsNestedInput = {
    create?: XOR<TripCreateWithoutAlertsInput, TripUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: TripCreateOrConnectWithoutAlertsInput
    upsert?: TripUpsertWithoutAlertsInput
    disconnect?: TripWhereInput | boolean
    delete?: TripWhereInput | boolean
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutAlertsInput, TripUpdateWithoutAlertsInput>, TripUncheckedUpdateWithoutAlertsInput>
  }

  export type ZoneUpdateOneWithoutAlertsNestedInput = {
    disconnect?: ZoneWhereInput | boolean
    delete?: ZoneWhereInput | boolean
    connect?: ZoneWhereUniqueInput
    update?: XOR<XOR<ZoneUpdateToOneWithWhereWithoutAlertsInput, ZoneUpdateWithoutAlertsInput>, ZoneUncheckedUpdateWithoutAlertsInput>
  }

  export type TripCreateNestedOneWithoutHistoryInput = {
    create?: XOR<TripCreateWithoutHistoryInput, TripUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TripCreateOrConnectWithoutHistoryInput
    connect?: TripWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStatusChangesInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    connect?: UserWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<TripCreateWithoutHistoryInput, TripUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TripCreateOrConnectWithoutHistoryInput
    upsert?: TripUpsertWithoutHistoryInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutHistoryInput, TripUpdateWithoutHistoryInput>, TripUncheckedUpdateWithoutHistoryInput>
  }

  export type UserUpdateOneWithoutStatusChangesNestedInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    upsert?: UserUpsertWithoutStatusChangesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatusChangesInput, UserUpdateWithoutStatusChangesInput>, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type GpsLogCreateprnsInput = {
    set: number[]
  }

  export type GpsLogCreatesnrsInput = {
    set: number[]
  }

  export type VesselCreateNestedOneWithoutGpsLogsInput = {
    create?: XOR<VesselCreateWithoutGpsLogsInput, VesselUncheckedCreateWithoutGpsLogsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutGpsLogsInput
    connect?: VesselWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GpsLogUpdateprnsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type GpsLogUpdatesnrsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type VesselUpdateOneWithoutGpsLogsNestedInput = {
    create?: XOR<VesselCreateWithoutGpsLogsInput, VesselUncheckedCreateWithoutGpsLogsInput>
    connectOrCreate?: VesselCreateOrConnectWithoutGpsLogsInput
    upsert?: VesselUpsertWithoutGpsLogsInput
    disconnect?: VesselWhereInput | boolean
    delete?: VesselWhereInput | boolean
    connect?: VesselWhereUniqueInput
    update?: XOR<XOR<VesselUpdateToOneWithWhereWithoutGpsLogsInput, VesselUpdateWithoutGpsLogsInput>, VesselUncheckedUpdateWithoutGpsLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumVesselTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VesselType | EnumVesselTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVesselTypeFilter<$PrismaModel> | $Enums.VesselType
  }

  export type NestedEnumVesselTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VesselType | EnumVesselTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VesselType[] | ListEnumVesselTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVesselTypeWithAggregatesFilter<$PrismaModel> | $Enums.VesselType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVesselTypeFilter<$PrismaModel>
    _max?: NestedEnumVesselTypeFilter<$PrismaModel>
  }

  export type NestedEnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type NestedEnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type NestedEnumAlertStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertStatusFilter<$PrismaModel> | $Enums.AlertStatus
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertStatus[] | ListEnumAlertStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel> | $Enums.AlertStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertStatusFilter<$PrismaModel>
    _max?: NestedEnumAlertStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutRoleInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusChanges?: TripStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusChanges?: TripStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    roleId?: UuidFilter<"User"> | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type TripStatusHistoryCreateWithoutUserInput = {
    id?: string
    status: $Enums.TripStatus
    timestamp?: Date | string
    remarks?: string | null
    trip: TripCreateNestedOneWithoutHistoryInput
  }

  export type TripStatusHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    tripId: string
    status: $Enums.TripStatus
    timestamp?: Date | string
    remarks?: string | null
  }

  export type TripStatusHistoryCreateOrConnectWithoutUserInput = {
    where: TripStatusHistoryWhereUniqueInput
    create: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput>
  }

  export type TripStatusHistoryCreateManyUserInputEnvelope = {
    data: TripStatusHistoryCreateManyUserInput | TripStatusHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripStatusHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: TripStatusHistoryWhereUniqueInput
    update: XOR<TripStatusHistoryUpdateWithoutUserInput, TripStatusHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<TripStatusHistoryCreateWithoutUserInput, TripStatusHistoryUncheckedCreateWithoutUserInput>
  }

  export type TripStatusHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: TripStatusHistoryWhereUniqueInput
    data: XOR<TripStatusHistoryUpdateWithoutUserInput, TripStatusHistoryUncheckedUpdateWithoutUserInput>
  }

  export type TripStatusHistoryUpdateManyWithWhereWithoutUserInput = {
    where: TripStatusHistoryScalarWhereInput
    data: XOR<TripStatusHistoryUpdateManyMutationInput, TripStatusHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type TripStatusHistoryScalarWhereInput = {
    AND?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
    OR?: TripStatusHistoryScalarWhereInput[]
    NOT?: TripStatusHistoryScalarWhereInput | TripStatusHistoryScalarWhereInput[]
    id?: UuidFilter<"TripStatusHistory"> | string
    tripId?: UuidFilter<"TripStatusHistory"> | string
    status?: EnumTripStatusFilter<"TripStatusHistory"> | $Enums.TripStatus
    changedBy?: UuidNullableFilter<"TripStatusHistory"> | string | null
    timestamp?: DateTimeFilter<"TripStatusHistory"> | Date | string
    remarks?: StringNullableFilter<"TripStatusHistory"> | string | null
  }

  export type TripCreateWithoutVesselInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    points?: LocationPointCreateNestedManyWithoutTripInput
    alerts?: AlertCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutVesselInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    points?: LocationPointUncheckedCreateNestedManyWithoutTripInput
    alerts?: AlertUncheckedCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutVesselInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput>
  }

  export type TripCreateManyVesselInputEnvelope = {
    data: TripCreateManyVesselInput | TripCreateManyVesselInput[]
    skipDuplicates?: boolean
  }

  export type AlertCreateWithoutVesselInput = {
    id?: string
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    trip?: TripCreateNestedOneWithoutAlertsInput
    zone?: ZoneCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateWithoutVesselInput = {
    id?: string
    tripId?: string | null
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertCreateOrConnectWithoutVesselInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput>
  }

  export type AlertCreateManyVesselInputEnvelope = {
    data: AlertCreateManyVesselInput | AlertCreateManyVesselInput[]
    skipDuplicates?: boolean
  }

  export type GpsLogCreateWithoutVesselInput = {
    id?: string
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
  }

  export type GpsLogUncheckedCreateWithoutVesselInput = {
    id?: string
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
  }

  export type GpsLogCreateOrConnectWithoutVesselInput = {
    where: GpsLogWhereUniqueInput
    create: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput>
  }

  export type GpsLogCreateManyVesselInputEnvelope = {
    data: GpsLogCreateManyVesselInput | GpsLogCreateManyVesselInput[]
    skipDuplicates?: boolean
  }

  export type TripUpsertWithWhereUniqueWithoutVesselInput = {
    where: TripWhereUniqueInput
    update: XOR<TripUpdateWithoutVesselInput, TripUncheckedUpdateWithoutVesselInput>
    create: XOR<TripCreateWithoutVesselInput, TripUncheckedCreateWithoutVesselInput>
  }

  export type TripUpdateWithWhereUniqueWithoutVesselInput = {
    where: TripWhereUniqueInput
    data: XOR<TripUpdateWithoutVesselInput, TripUncheckedUpdateWithoutVesselInput>
  }

  export type TripUpdateManyWithWhereWithoutVesselInput = {
    where: TripScalarWhereInput
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyWithoutVesselInput>
  }

  export type TripScalarWhereInput = {
    AND?: TripScalarWhereInput | TripScalarWhereInput[]
    OR?: TripScalarWhereInput[]
    NOT?: TripScalarWhereInput | TripScalarWhereInput[]
    id?: UuidFilter<"Trip"> | string
    vesselId?: UuidFilter<"Trip"> | string
    status?: EnumTripStatusFilter<"Trip"> | $Enums.TripStatus
    startTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Trip"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Trip"> | Date | string | null
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    updatedAt?: DateTimeFilter<"Trip"> | Date | string
  }

  export type AlertUpsertWithWhereUniqueWithoutVesselInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutVesselInput, AlertUncheckedUpdateWithoutVesselInput>
    create: XOR<AlertCreateWithoutVesselInput, AlertUncheckedCreateWithoutVesselInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutVesselInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutVesselInput, AlertUncheckedUpdateWithoutVesselInput>
  }

  export type AlertUpdateManyWithWhereWithoutVesselInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutVesselInput>
  }

  export type AlertScalarWhereInput = {
    AND?: AlertScalarWhereInput | AlertScalarWhereInput[]
    OR?: AlertScalarWhereInput[]
    NOT?: AlertScalarWhereInput | AlertScalarWhereInput[]
    id?: UuidFilter<"Alert"> | string
    vesselId?: UuidFilter<"Alert"> | string
    tripId?: UuidNullableFilter<"Alert"> | string | null
    zoneId?: UuidNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    message?: StringFilter<"Alert"> | string
    timestamp?: DateTimeFilter<"Alert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
  }

  export type GpsLogUpsertWithWhereUniqueWithoutVesselInput = {
    where: GpsLogWhereUniqueInput
    update: XOR<GpsLogUpdateWithoutVesselInput, GpsLogUncheckedUpdateWithoutVesselInput>
    create: XOR<GpsLogCreateWithoutVesselInput, GpsLogUncheckedCreateWithoutVesselInput>
  }

  export type GpsLogUpdateWithWhereUniqueWithoutVesselInput = {
    where: GpsLogWhereUniqueInput
    data: XOR<GpsLogUpdateWithoutVesselInput, GpsLogUncheckedUpdateWithoutVesselInput>
  }

  export type GpsLogUpdateManyWithWhereWithoutVesselInput = {
    where: GpsLogScalarWhereInput
    data: XOR<GpsLogUpdateManyMutationInput, GpsLogUncheckedUpdateManyWithoutVesselInput>
  }

  export type GpsLogScalarWhereInput = {
    AND?: GpsLogScalarWhereInput | GpsLogScalarWhereInput[]
    OR?: GpsLogScalarWhereInput[]
    NOT?: GpsLogScalarWhereInput | GpsLogScalarWhereInput[]
    id?: UuidFilter<"GpsLog"> | string
    vesselId?: UuidNullableFilter<"GpsLog"> | string | null
    mmsi?: StringNullableFilter<"GpsLog"> | string | null
    utc_datetime?: DateTimeFilter<"GpsLog"> | Date | string
    received_at?: DateTimeFilter<"GpsLog"> | Date | string
    latitude?: FloatFilter<"GpsLog"> | number
    longitude?: FloatFilter<"GpsLog"> | number
    altitude_m?: FloatNullableFilter<"GpsLog"> | number | null
    speed_kmh?: FloatNullableFilter<"GpsLog"> | number | null
    heading_deg?: FloatNullableFilter<"GpsLog"> | number | null
    satellites?: IntNullableFilter<"GpsLog"> | number | null
    hdop?: FloatNullableFilter<"GpsLog"> | number | null
    fix_status?: IntNullableFilter<"GpsLog"> | number | null
    prns?: IntNullableListFilter<"GpsLog">
    snrs?: FloatNullableListFilter<"GpsLog">
  }

  export type VesselCreateWithoutTripsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alerts?: AlertCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogCreateNestedManyWithoutVesselInput
  }

  export type VesselUncheckedCreateWithoutTripsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alerts?: AlertUncheckedCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogUncheckedCreateNestedManyWithoutVesselInput
  }

  export type VesselCreateOrConnectWithoutTripsInput = {
    where: VesselWhereUniqueInput
    create: XOR<VesselCreateWithoutTripsInput, VesselUncheckedCreateWithoutTripsInput>
  }

  export type LocationPointCreateWithoutTripInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationPointUncheckedCreateWithoutTripInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationPointCreateOrConnectWithoutTripInput = {
    where: LocationPointWhereUniqueInput
    create: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput>
  }

  export type LocationPointCreateManyTripInputEnvelope = {
    data: LocationPointCreateManyTripInput | LocationPointCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type AlertCreateWithoutTripInput = {
    id?: string
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    vessel: VesselCreateNestedOneWithoutAlertsInput
    zone?: ZoneCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateWithoutTripInput = {
    id?: string
    vesselId: string
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertCreateOrConnectWithoutTripInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput>
  }

  export type AlertCreateManyTripInputEnvelope = {
    data: AlertCreateManyTripInput | AlertCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type TripStatusHistoryCreateWithoutTripInput = {
    id?: string
    status: $Enums.TripStatus
    timestamp?: Date | string
    remarks?: string | null
    user?: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type TripStatusHistoryUncheckedCreateWithoutTripInput = {
    id?: string
    status: $Enums.TripStatus
    changedBy?: string | null
    timestamp?: Date | string
    remarks?: string | null
  }

  export type TripStatusHistoryCreateOrConnectWithoutTripInput = {
    where: TripStatusHistoryWhereUniqueInput
    create: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput>
  }

  export type TripStatusHistoryCreateManyTripInputEnvelope = {
    data: TripStatusHistoryCreateManyTripInput | TripStatusHistoryCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type VesselUpsertWithoutTripsInput = {
    update: XOR<VesselUpdateWithoutTripsInput, VesselUncheckedUpdateWithoutTripsInput>
    create: XOR<VesselCreateWithoutTripsInput, VesselUncheckedCreateWithoutTripsInput>
    where?: VesselWhereInput
  }

  export type VesselUpdateToOneWithWhereWithoutTripsInput = {
    where?: VesselWhereInput
    data: XOR<VesselUpdateWithoutTripsInput, VesselUncheckedUpdateWithoutTripsInput>
  }

  export type VesselUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUpdateManyWithoutVesselNestedInput
  }

  export type VesselUncheckedUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUncheckedUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUncheckedUpdateManyWithoutVesselNestedInput
  }

  export type LocationPointUpsertWithWhereUniqueWithoutTripInput = {
    where: LocationPointWhereUniqueInput
    update: XOR<LocationPointUpdateWithoutTripInput, LocationPointUncheckedUpdateWithoutTripInput>
    create: XOR<LocationPointCreateWithoutTripInput, LocationPointUncheckedCreateWithoutTripInput>
  }

  export type LocationPointUpdateWithWhereUniqueWithoutTripInput = {
    where: LocationPointWhereUniqueInput
    data: XOR<LocationPointUpdateWithoutTripInput, LocationPointUncheckedUpdateWithoutTripInput>
  }

  export type LocationPointUpdateManyWithWhereWithoutTripInput = {
    where: LocationPointScalarWhereInput
    data: XOR<LocationPointUpdateManyMutationInput, LocationPointUncheckedUpdateManyWithoutTripInput>
  }

  export type LocationPointScalarWhereInput = {
    AND?: LocationPointScalarWhereInput | LocationPointScalarWhereInput[]
    OR?: LocationPointScalarWhereInput[]
    NOT?: LocationPointScalarWhereInput | LocationPointScalarWhereInput[]
    id?: UuidFilter<"LocationPoint"> | string
    tripId?: UuidFilter<"LocationPoint"> | string
    latitude?: FloatFilter<"LocationPoint"> | number
    longitude?: FloatFilter<"LocationPoint"> | number
    speed?: FloatNullableFilter<"LocationPoint"> | number | null
    heading?: FloatNullableFilter<"LocationPoint"> | number | null
    timestamp?: DateTimeFilter<"LocationPoint"> | Date | string
  }

  export type AlertUpsertWithWhereUniqueWithoutTripInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutTripInput, AlertUncheckedUpdateWithoutTripInput>
    create: XOR<AlertCreateWithoutTripInput, AlertUncheckedCreateWithoutTripInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutTripInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutTripInput, AlertUncheckedUpdateWithoutTripInput>
  }

  export type AlertUpdateManyWithWhereWithoutTripInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutTripInput>
  }

  export type TripStatusHistoryUpsertWithWhereUniqueWithoutTripInput = {
    where: TripStatusHistoryWhereUniqueInput
    update: XOR<TripStatusHistoryUpdateWithoutTripInput, TripStatusHistoryUncheckedUpdateWithoutTripInput>
    create: XOR<TripStatusHistoryCreateWithoutTripInput, TripStatusHistoryUncheckedCreateWithoutTripInput>
  }

  export type TripStatusHistoryUpdateWithWhereUniqueWithoutTripInput = {
    where: TripStatusHistoryWhereUniqueInput
    data: XOR<TripStatusHistoryUpdateWithoutTripInput, TripStatusHistoryUncheckedUpdateWithoutTripInput>
  }

  export type TripStatusHistoryUpdateManyWithWhereWithoutTripInput = {
    where: TripStatusHistoryScalarWhereInput
    data: XOR<TripStatusHistoryUpdateManyMutationInput, TripStatusHistoryUncheckedUpdateManyWithoutTripInput>
  }

  export type TripCreateWithoutPointsInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vessel: VesselCreateNestedOneWithoutTripsInput
    alerts?: AlertCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutPointsInput = {
    id?: string
    vesselId: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alerts?: AlertUncheckedCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutPointsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutPointsInput, TripUncheckedCreateWithoutPointsInput>
  }

  export type TripUpsertWithoutPointsInput = {
    update: XOR<TripUpdateWithoutPointsInput, TripUncheckedUpdateWithoutPointsInput>
    create: XOR<TripCreateWithoutPointsInput, TripUncheckedCreateWithoutPointsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutPointsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutPointsInput, TripUncheckedUpdateWithoutPointsInput>
  }

  export type TripUpdateWithoutPointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vessel?: VesselUpdateOneRequiredWithoutTripsNestedInput
    alerts?: AlertUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutPointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUncheckedUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUncheckedUpdateManyWithoutTripNestedInput
  }

  export type AlertCreateWithoutZoneInput = {
    id?: string
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    vessel: VesselCreateNestedOneWithoutAlertsInput
    trip?: TripCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateWithoutZoneInput = {
    id?: string
    vesselId: string
    tripId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertCreateOrConnectWithoutZoneInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutZoneInput, AlertUncheckedCreateWithoutZoneInput>
  }

  export type AlertUpsertWithWhereUniqueWithoutZoneInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutZoneInput, AlertUncheckedUpdateWithoutZoneInput>
    create: XOR<AlertCreateWithoutZoneInput, AlertUncheckedCreateWithoutZoneInput>
  }

  export type AlertCreateManyZoneInputEnvelope = {
    data: AlertCreateManyZoneInput | AlertCreateManyZoneInput[]
    skipDuplicates?: boolean
  }

  export type AlertUpdateWithWhereUniqueWithoutZoneInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutZoneInput, AlertUncheckedUpdateWithoutZoneInput>
  }

  export type AlertUpdateManyWithWhereWithoutZoneInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutZoneInput>
  }

  export type VesselCreateWithoutAlertsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogCreateNestedManyWithoutVesselInput
  }

  export type VesselUncheckedCreateWithoutAlertsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripUncheckedCreateNestedManyWithoutVesselInput
    gpsLogs?: GpsLogUncheckedCreateNestedManyWithoutVesselInput
  }

  export type VesselCreateOrConnectWithoutAlertsInput = {
    where: VesselWhereUniqueInput
    create: XOR<VesselCreateWithoutAlertsInput, VesselUncheckedCreateWithoutAlertsInput>
  }

  export type TripCreateWithoutAlertsInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vessel: VesselCreateNestedOneWithoutTripsInput
    points?: LocationPointCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutAlertsInput = {
    id?: string
    vesselId: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    points?: LocationPointUncheckedCreateNestedManyWithoutTripInput
    history?: TripStatusHistoryUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutAlertsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutAlertsInput, TripUncheckedCreateWithoutAlertsInput>
  }

  export type VesselUpsertWithoutAlertsInput = {
    update: XOR<VesselUpdateWithoutAlertsInput, VesselUncheckedUpdateWithoutAlertsInput>
    create: XOR<VesselCreateWithoutAlertsInput, VesselUncheckedCreateWithoutAlertsInput>
    where?: VesselWhereInput
  }

  export type VesselUpdateToOneWithWhereWithoutAlertsInput = {
    where?: VesselWhereInput
    data: XOR<VesselUpdateWithoutAlertsInput, VesselUncheckedUpdateWithoutAlertsInput>
  }

  export type VesselUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUpdateManyWithoutVesselNestedInput
  }

  export type VesselUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUncheckedUpdateManyWithoutVesselNestedInput
    gpsLogs?: GpsLogUncheckedUpdateManyWithoutVesselNestedInput
  }

  export type TripUpsertWithoutAlertsInput = {
    update: XOR<TripUpdateWithoutAlertsInput, TripUncheckedUpdateWithoutAlertsInput>
    create: XOR<TripCreateWithoutAlertsInput, TripUncheckedCreateWithoutAlertsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutAlertsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutAlertsInput, TripUncheckedUpdateWithoutAlertsInput>
  }

  export type TripUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vessel?: VesselUpdateOneRequiredWithoutTripsNestedInput
    points?: LocationPointUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: LocationPointUncheckedUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUncheckedUpdateManyWithoutTripNestedInput
  }

  export type ZoneUpdateToOneWithWhereWithoutAlertsInput = {
    where?: ZoneWhereInput
    data: XOR<ZoneUpdateWithoutAlertsInput, ZoneUncheckedUpdateWithoutAlertsInput>
  }

  export type ZoneUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateWithoutHistoryInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vessel: VesselCreateNestedOneWithoutTripsInput
    points?: LocationPointCreateNestedManyWithoutTripInput
    alerts?: AlertCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutHistoryInput = {
    id?: string
    vesselId: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    points?: LocationPointUncheckedCreateNestedManyWithoutTripInput
    alerts?: AlertUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutHistoryInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutHistoryInput, TripUncheckedCreateWithoutHistoryInput>
  }

  export type UserCreateWithoutStatusChangesInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutStatusChangesInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    roleId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutStatusChangesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
  }

  export type TripUpsertWithoutHistoryInput = {
    update: XOR<TripUpdateWithoutHistoryInput, TripUncheckedUpdateWithoutHistoryInput>
    create: XOR<TripCreateWithoutHistoryInput, TripUncheckedCreateWithoutHistoryInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutHistoryInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutHistoryInput, TripUncheckedUpdateWithoutHistoryInput>
  }

  export type TripUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vessel?: VesselUpdateOneRequiredWithoutTripsNestedInput
    points?: LocationPointUpdateManyWithoutTripNestedInput
    alerts?: AlertUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: LocationPointUncheckedUpdateManyWithoutTripNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutTripNestedInput
  }

  export type UserUpsertWithoutStatusChangesInput = {
    update: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatusChangesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type UserUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VesselCreateWithoutGpsLogsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripCreateNestedManyWithoutVesselInput
    alerts?: AlertCreateNestedManyWithoutVesselInput
  }

  export type VesselUncheckedCreateWithoutGpsLogsInput = {
    id?: string
    name: string
    imo: string
    mmsi: string
    type?: $Enums.VesselType
    flag?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trips?: TripUncheckedCreateNestedManyWithoutVesselInput
    alerts?: AlertUncheckedCreateNestedManyWithoutVesselInput
  }

  export type VesselCreateOrConnectWithoutGpsLogsInput = {
    where: VesselWhereUniqueInput
    create: XOR<VesselCreateWithoutGpsLogsInput, VesselUncheckedCreateWithoutGpsLogsInput>
  }

  export type VesselUpsertWithoutGpsLogsInput = {
    update: XOR<VesselUpdateWithoutGpsLogsInput, VesselUncheckedUpdateWithoutGpsLogsInput>
    create: XOR<VesselCreateWithoutGpsLogsInput, VesselUncheckedCreateWithoutGpsLogsInput>
    where?: VesselWhereInput
  }

  export type VesselUpdateToOneWithWhereWithoutGpsLogsInput = {
    where?: VesselWhereInput
    data: XOR<VesselUpdateWithoutGpsLogsInput, VesselUncheckedUpdateWithoutGpsLogsInput>
  }

  export type VesselUpdateWithoutGpsLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUpdateManyWithoutVesselNestedInput
    alerts?: AlertUpdateManyWithoutVesselNestedInput
  }

  export type VesselUncheckedUpdateWithoutGpsLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imo?: StringFieldUpdateOperationsInput | string
    mmsi?: StringFieldUpdateOperationsInput | string
    type?: EnumVesselTypeFieldUpdateOperationsInput | $Enums.VesselType
    flag?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: TripUncheckedUpdateManyWithoutVesselNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutVesselNestedInput
  }

  export type UserCreateManyRoleInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusChanges?: TripStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusChanges?: TripStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripStatusHistoryCreateManyUserInput = {
    id?: string
    tripId: string
    status: $Enums.TripStatus
    timestamp?: Date | string
    remarks?: string | null
  }

  export type TripStatusHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    trip?: TripUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type TripStatusHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripStatusHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripCreateManyVesselInput = {
    id?: string
    status?: $Enums.TripStatus
    startTime?: Date | string | null
    endTime?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertCreateManyVesselInput = {
    id?: string
    tripId?: string | null
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type GpsLogCreateManyVesselInput = {
    id?: string
    mmsi?: string | null
    utc_datetime: Date | string
    received_at?: Date | string
    latitude: number
    longitude: number
    altitude_m?: number | null
    speed_kmh?: number | null
    heading_deg?: number | null
    satellites?: number | null
    hdop?: number | null
    fix_status?: number | null
    prns?: GpsLogCreateprnsInput | number[]
    snrs?: GpsLogCreatesnrsInput | number[]
  }

  export type TripUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: LocationPointUpdateManyWithoutTripNestedInput
    alerts?: AlertUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: LocationPointUncheckedUpdateManyWithoutTripNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutTripNestedInput
    history?: TripStatusHistoryUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateManyWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip?: TripUpdateOneWithoutAlertsNestedInput
    zone?: ZoneUpdateOneWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GpsLogUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type GpsLogUncheckedUpdateWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type GpsLogUncheckedUpdateManyWithoutVesselInput = {
    id?: StringFieldUpdateOperationsInput | string
    mmsi?: NullableStringFieldUpdateOperationsInput | string | null
    utc_datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude_m?: NullableFloatFieldUpdateOperationsInput | number | null
    speed_kmh?: NullableFloatFieldUpdateOperationsInput | number | null
    heading_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    hdop?: NullableFloatFieldUpdateOperationsInput | number | null
    fix_status?: NullableIntFieldUpdateOperationsInput | number | null
    prns?: GpsLogUpdateprnsInput | number[]
    snrs?: GpsLogUpdatesnrsInput | number[]
  }

  export type LocationPointCreateManyTripInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type AlertCreateManyTripInput = {
    id?: string
    vesselId: string
    zoneId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type TripStatusHistoryCreateManyTripInput = {
    id?: string
    status: $Enums.TripStatus
    changedBy?: string | null
    timestamp?: Date | string
    remarks?: string | null
  }

  export type LocationPointUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationPointUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationPointUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vessel?: VesselUpdateOneRequiredWithoutAlertsNestedInput
    zone?: ZoneUpdateOneWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TripStatusHistoryUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutStatusChangesNestedInput
  }

  export type TripStatusHistoryUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripStatusHistoryUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AlertUpdateWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vessel?: VesselUpdateOneRequiredWithoutAlertsNestedInput
    trip?: TripUpdateOneWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertCreateManyZoneInput = {
    id?: string
    vesselId: string
    tripId?: string | null
    type: string
    severity?: $Enums.AlertSeverity
    status?: $Enums.AlertStatus
    message: string
    timestamp?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AlertUncheckedUpdateManyWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    vesselId?: StringFieldUpdateOperationsInput | string
    tripId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    message?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}