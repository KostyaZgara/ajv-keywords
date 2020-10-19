"use strict"

module.exports = function defFunc(ajv) {
  defFunc.definition = {
    type: "object",
    macro: function (schema) {
      if (schema.length === 0) return true
      if (schema.length === 1) return {not: {required: schema}}
      const schemas = schema.map((prop) => {
        return {required: [prop]}
      })
      return {not: {anyOf: schemas}}
    },
    metaSchema: {
      type: "array",
      items: {
        type: "string",
      },
    },
  }

  ajv.addKeyword("prohibited", defFunc.definition)
  return ajv
}