export async function sendTx(client:any,txData:any,value:any){
    const hash = await client.sendTransaction({
        from:txData.from,
        to:txData.to,
        data:txData.data,
        value
    })
      return hash;
}