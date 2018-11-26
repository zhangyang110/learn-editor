#!/bin/bash
# for test
# mocha --compilers js:babel-register ./*.test.js

mkdir -p tvapi
cd tvapi
rm -rf *
swagger-codegen generate -i ../../../../tv-apispec/dist/swagger.yaml -l javascript -DusePromises=true -DuseES6=true

#  swagger-codegen generate -i ../../dist/swagger.yaml -l javascript -DusePromises=true -DuseES6=true


# cd services
# sh genjs.sh
