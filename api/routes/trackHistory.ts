import express from "express";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import Track from "../models/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', async (_req,res,next) => {
    try{
        const tracksHistory = await TrackHistory.find() ;
        res.send(tracksHistory);
    } catch (e){
        next(e)
    }
});
trackHistoryRouter.get('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const tracksHistoryId = await TrackHistory.findById(id).populate('user_id').populate('track_id') ;
        res.send(tracksHistoryId);
    } catch (e){
        next(e)
    }
});

trackHistoryRouter.post('/', async (req, res, next) => {
  const token = req.get('Authorization');
  if(!token) return res.status(401).send({error: 'No token present'})

    try{
      const findUser = await User.findOne({token})
      if (!findUser) return res.status(401).send('Unauthorized user')

      const newTrackHistory = new TrackHistory({
          user_id: findUser,
          track_id: req.body.track_id
      }) ;

      await newTrackHistory.save();
      res.send(newTrackHistory);

  }catch (e){
      next(e);
  }
})

export default trackHistoryRouter;