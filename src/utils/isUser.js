export default async function isUser(session) {
    if (!session || !session.user) return false;
    
    return true; 
}