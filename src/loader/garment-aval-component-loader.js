import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'aval-components';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("garment-production");
  console.log(keyword, filter);
  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
    .then(results => {
   
        return results.data;
      
    });
}
