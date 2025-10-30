/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { setChildRecordParam, updateDetailsParam } from '../data/sample15';
import { ParameterSchema } from '../src/schema/parameter';
import { MichelsonMap } from '../src/michelson-map';

describe('Schema test when calling contract with complex object as param and null value', () => {

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(setChildRecordParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //address(optional)
      dataMap,//data
      'AAAA', //label
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //owner
      'FFFF', //parent
      '1' //ttl(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "prim": "Pair",
              "args": [
                {
                  "prim": "Some",
                  "args": [
                    {
                      "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                    }
                  ]
                },
                [
                  {
                    "prim": "Elt",
                    "args": [
                      {
                        "string": "Hello World"
                      },
                      {
                        "prim": "Left",
                        "args": [
                          {
                            "prim": "Left",
                            "args": [
                              {
                                "prim": "Left",
                                "args": [
                                  {
                                    "prim": "Right",
                                    "args": [
                                      {
                                        "prim": "True"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            {
              "prim": "Pair",
              "args": [
                {
                  "bytes": "AAAA"
                },
                {
                  "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                }
              ]
            }
          ]
        },
        {
          "prim": "Pair",
          "args": [
            {
              "bytes": "FFFF"
            },
            {
              "prim": "Some",
              "args": [
                {
                  "int": "1"
                }
              ]
            }
          ]
        }
      ]
    });
  });

  it('Should encode parameter schema properly when first element which is optional is null', () => {
    const schema = new ParameterSchema(setChildRecordParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      null, //address(optional)
      dataMap,//data
      'AAAA', //label
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //owner
      'FFFF', //parent
      '1' //ttl(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "prim": "Pair",
              "args": [
                {
                  "prim": "None"
                },
                [
                  {
                    "prim": "Elt",
                    "args": [
                      {
                        "string": "Hello World"
                      },
                      {
                        "prim": "Left",
                        "args": [
                          {
                            "prim": "Left",
                            "args": [
                              {
                                "prim": "Left",
                                "args": [
                                  {
                                    "prim": "Right",
                                    "args": [
                                      {
                                        "prim": "True"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            {
              "prim": "Pair",
              "args": [
                {
                  "bytes": "AAAA"
                },
                {
                  "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                }
              ]
            }
          ]
        },
        {
          "prim": "Pair",
          "args": [
            {
              "bytes": "FFFF"
            },
            {
              "prim": "Some",
              "args": [
                {
                  "int": "1"
                }
              ]
            }
          ]
        }
      ]
    });
  });

  it('Should encode parameter schema properly when last element which is optional is null', () => {
    const schema = new ParameterSchema(setChildRecordParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //address(optional)
      dataMap,//data
      'AAAA', //label
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //owner
      'FFFF', //parent
      null //ttl(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "prim": "Pair",
              "args": [
                {
                  "prim": "Some",
                  "args": [
                    {
                      "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                    }
                  ]
                },
                [
                  {
                    "prim": "Elt",
                    "args": [
                      {
                        "string": "Hello World"
                      },
                      {
                        "prim": "Left",
                        "args": [
                          {
                            "prim": "Left",
                            "args": [
                              {
                                "prim": "Left",
                                "args": [
                                  {
                                    "prim": "Right",
                                    "args": [
                                      {
                                        "prim": "True"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            {
              "prim": "Pair",
              "args": [
                {
                  "bytes": "AAAA"
                },
                {
                  "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                }
              ]
            }
          ]
        },
        {
          "prim": "Pair",
          "args": [
            {
              "bytes": "FFFF"
            },
            {
              "prim": "None"
            }
          ]
        }
      ]
    });
  });

  it('Should encode parameter schema properly when first and last element which are optional are null', () => {
    const schema = new ParameterSchema(setChildRecordParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      null, //address(optional)
      dataMap,//data
      'AAAA', //label
      'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', //owner
      'FFFF', //parent
      null //ttl(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "prim": "Pair",
              "args": [
                {
                  "prim": "None"
                },
                [
                  {
                    "prim": "Elt",
                    "args": [
                      {
                        "string": "Hello World"
                      },
                      {
                        "prim": "Left",
                        "args": [
                          {
                            "prim": "Left",
                            "args": [
                              {
                                "prim": "Left",
                                "args": [
                                  {
                                    "prim": "Right",
                                    "args": [
                                      {
                                        "prim": "True"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            {
              "prim": "Pair",
              "args": [
                {
                  "bytes": "AAAA"
                },
                {
                  "string": "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
                }
              ]
            }
          ]
        },
        {
          "prim": "Pair",
          "args": [
            {
              "bytes": "FFFF"
            },
            {
              "prim": "None"
            }
          ]
        }
      ]
    });
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(updateDetailsParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      '5',//id
      'mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo', //new_controller(optional)
      'AAAA', //new_profile(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "int": "5"
            },
            {
              "prim": "Some",
              "args": [
                {
                  "string": "mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo"
                }
              ]
            }
          ]
        },
        {
          "prim": "Some",
          "args": [
            {
              "bytes": "AAAA"
            }
          ]
        }
      ]
    });
  });

  it('Should encode parameter schema properly if last element which is optinal is null', () => {
    const schema = new ParameterSchema(updateDetailsParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      '5',//id
      'mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo', //new_controller(optional)
      null, //new_profile(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "int": "5"
            },
            {
              "prim": "Some",
              "args": [
                {
                  "string": "mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo"
                }
              ]
            }
          ]
        },
        {
          "prim": "None"
        }
      ]
    });
  });

  it('Should encode parameter schema properly if second and last elements which are optional are null', () => {
    const schema = new ParameterSchema(updateDetailsParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      '5',//id
      null, //new_controller(optional)
      null, //new_profile(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "int": "5"
            },
            {
              "prim": "None"
            }
          ]
        },
        {
          "prim": "None"
        }
      ]
    });
  });

  it('Should encode parameter schema properly if second element which is optional is null', () => {
    const schema = new ParameterSchema(updateDetailsParam);
    const dataMap = new MichelsonMap();
    dataMap.set("Hello World", {bool:true})
    const result = schema.Encode(
      '5',//id
      null, //new_controller(optional)
      'AAAA', //new_profile(optional)
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      "prim": "Pair",
      "args": [
        {
          "prim": "Pair",
          "args": [
            {
              "int": "5"
            },
            {
              "prim": "None"
            }
          ]
        },
        {
          "prim": "Some",
          "args": [
            {
              "bytes": "AAAA"
            }
          ]
        }
      ]
    });
  });

});
