export const totalAccountByRole = (role: string, accounts: any[]) => {
    let count = 0;
    const total = accounts?.filter(account => account?.accountType === role);
    count = total?.length;
    return count;
} 