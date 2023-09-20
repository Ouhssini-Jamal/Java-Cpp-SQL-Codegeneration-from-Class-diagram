
export class MyClass {
  id = 1
    constructor(name) {
      this.name = name;
      this.id++;
}
attributes = [];
functions = [];
extend = "false";
implement = "null";
agregate = [];
composed = [];
packageId = 152;
package_name = "implementations";
}

export class Interface {
  constructor(name) {
    this.name = name;
}
attributes = [];
functions = [];
rls = [];
}

export class Method {
  constructor(name) {
    this.name = name;
}
attr = [];
returntype = null;
}

export class relation {
  constructor(name,type,class1,class2) {
    this.name = name;
    this.type = type;
    this.class1 = class1;
    this.class2 = class2;
}
}


export const JavaTypes = Object.freeze({
  BOOLEAN: 'boolean',
  BYTE: 'byte',
  CHAR: 'char',
  SHORT: 'short',
  INT: 'int',
  LONG: 'long',
  FLOAT: 'float',
  DOUBLE: 'double',
  STRING: 'String',
});

export const RelationshipTypes = Object.freeze({
  AGGREGATION: 'Aggregation',
  COMPOSITION: 'Composition',
});



