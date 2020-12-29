import axios from 'axios';
/**
 * we have created this anti-corruption layer on top of axios keeping in mind that in future 
 * we may have to switch to some other library like super-agent, got, request etc.
 * for more context: https://softwareengineering.stackexchange.com/q/361484
 */
const mrc = axios;


/**
 * Sample overriding of methods in case we switch to other library
 * mrc.get = (url, config) => superagent.get(url, config);
 * mrc.put = (url, config) => superagent.put(url, config);
 * mrc.post = (url, config) => superagent.post(url, config);
 * mrc.delete = (url, config) => superagent.delete(url, config);
 * 
 */


export default mrc;

