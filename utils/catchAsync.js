module.exports = fn => {
    return (req, res, next) => { // this function gets called when a new tour is created in createTour request. Reason why the params (req, res, next) are the same as async(req, res, next) in createTour function
        // .catch(next) ends up in my global handling middleware
      fn(req, res, next).catch(next); // this line allows me to get rid of the try/catch block.
    }
  };