
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.5.0
 * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
 */
Prisma.prismaVersion = {
  client: "4.5.0",
  engine: "0362da9eebca54d94c8ef5edd3b2e90af99ba452"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


const dirname = '/'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.ThingScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});


exports.Prisma.ModelName = makeEnum({
  Thing: 'Thing'
});

const compressedDMMF = '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'
const decompressedDMMF = decompressFromBase64(compressedDMMF)
// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(decompressedDMMF)
exports.Prisma.dmmf = JSON.parse(decompressedDMMF)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/ezequielbenitez/projects/emb/denojs-api/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [
      "deno"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../.env",
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "4.5.0",
  "engineVersion": "0362da9eebca54d94c8ef5edd3b2e90af99ba452",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "dataProxy": true
}
config.document = dmmf
config.dirname = dirname

config.inlineSchema = 'Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwKLy8gbGVhcm4gbW9yZSBhYm91dCBpdCBpbiB0aGUgZG9jczogaHR0cHM6Ly9wcmlzLmx5L2QvcHJpc21hLXNjaGVtYQoKZ2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgcHJldmlld0ZlYXR1cmVzID0gWyJkZW5vIl0KICBvdXRwdXQgICAgICAgICAgPSAiLi4vZ2VuZXJhdGVkL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibW9uZ29kYiIKICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikKfQoKbW9kZWwgVGhpbmcgewogIGlkICAgICAgICAgIFN0cmluZyBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQKICBuYW1lICAgICAgICBTdHJpbmcgQHVuaXF1ZQogIGRlc2NyaXB0aW9uIFN0cmluZwoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKfQo='
config.inlineSchemaHash = '216a3afd4749287d2e40afdf81cba6c88fe59c720a35ab297b26339cdc6d8a7b'

config.inlineDatasources = {
  "db": {
    "url": {
      "fromEnvVar": "DATABASE_URL",
      "value": null
    }
  }
}

config.injectableEdgeEnv = {
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
}

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

