import {UserProto, Check } from '../protoGenered/userManager_pb';
import {UserManagerClient} from '../protoGenered/userManager_grpc_web_pb'
import {useEffect} from "react";
import ServerLinks from "./ServerLinks";
/*import {Metadata} from "@grpc/grpc-js";*/
/*import * as grpc from "grpc-web"*/

const GrpcTemp = () => {
    useEffect(() => {
        doSome();
    }, [])



  const doSome = () => {
      let client = new UserManagerClient(ServerLinks.USER_MANAGER_MICROSERVICE, null, null)
      let request = new UserProto();
      request.setEmail("best.ofbest@best.com");
      request.setPassword("123123!!!");
      let token;
      client.login(request,  {}, (err, response) => {if (response == null) {
          console.log(err);
      }else {
          alert("IT's LOGIN THERE WOOHOOO!!!!");
          token = response.array[1];
          console.log(response);
          let request1 = new Check();
          request1.setSome("Hi!");
          let metadata = {Authorization : "Bearer " + token.trim()};
          /*let metadata = new Metadata();
          metadata.set("Authorization", "Bearer " + token);*/
          client.checkMate(request1,  metadata, (err, response) => {if (response == null) {
              console.log(err);
          }else {
              alert("IT WORKS!!!!");
              console.log(response);
          }
          });
      }
      });

  }

  return null;
}

export default GrpcTemp;