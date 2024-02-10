import { Server } from "socket.io";


const io = new Server({cors:'http://localhost:5173'})

let onlineUsers = [ ]
 
io.on('connection' , (socket)=>{
    console.log('Is Run');

     try {
       console.log('New Connection => ', socket.id);
     } catch (err) {
    console.log('validation err is => ' , err );
    }

    socket.on("addNewUser",(userId)=>{
    console.log('Id Cnx =>',userId);
      !onlineUsers.some((e)=>e.UserId == userId) &&
      onlineUsers.push({
      UserId:userId,
      socketId:socket.id,
     })
     io.emit("getOnlineUsers",onlineUsers)
  })
  



   socket.on('sendNotiComen',({senderId,reciverId,type, idComAdmin, message})=>{

    if(reciverId == senderId) return

    const resiver = onlineUsers.find((user) => user.UserId == reciverId)
    if(!resiver){
      return
    }
    // console.log( 'type   => ',reciverId );
    //  console.log( 'ResUser  => ', num);
    console.log('Type' , type);
    io.to(resiver.socketId).emit("getNotiComend",{
      senderId,
      reciverId,
      type,
      idComAdmin,
      message
    })
  })







    socket.on('disconnect',()=>{
    onlineUsers = onlineUsers.filter((e)=> e.socketId != socket.id)
    io.emit("getOnlineUsers",onlineUsers)
    // socket.broadcast.emit("callEnd")
  })
})

io.listen(4900,()=>{
  console.log('serve is rannnig... ');
});