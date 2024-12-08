export const totalBalance = (data: any[]) => {
    let count = 0;
    for (let index = 0; index < data?.length; index++) {
        count = count + data[index]?.amount
    }
    // console.log({ count })
    return count;
}