export namespace Handler {
  /**
   * Handle async functions
   * @param func Function to handle
   * @returns Middleware function for `express` route handling
   */
  export const Async = (func: (req: any, res: any, next?: any) => Promise<any> | void) => (req: any, res: any, next?: any) => {
    Promise.resolve(func(req, res, next)).catch(next);
  }

  /**
   * Handle errors (log and send status with error)
   */
  export const Sequence = (err: Error, req: any, res: any, next?: any) => {
    console.warn(err);
    res.status(500).send({error: err.message});
  }
}

