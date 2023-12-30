const asynHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((e)=>next(e))
    }
}


// hihger order function are accept function as paramter or return
// const asynHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (e) {
//     res.status(e.code || 500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };
export { asynHandler };
