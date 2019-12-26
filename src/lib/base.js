export default {
  exec(script, component, args) {
    let func = null;
    if (typeof script === 'string') {
      eval(`func=function(ctx){
        try{
          var result = null;
          ${script}
          return result;
        }catch(err){
          console.log(err);
          return null;
        }
      }`);
    } else if (typeof script === 'function') {
      func = script;
    } else {
      func = () => { return {}; };
    }
    return func.call(component, {
      component,
      args,
    });
  }
}