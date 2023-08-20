export const userFirebaseUser = ()=> useState<any>('firebaseUser',()=>{})
export const userEmail = ()=> useState<any>('userEmail',()=>'');
export const uid = ()=> useState<string>('uid',()=>'');
export const tickets = ()=> useState<any>('tickets',()=>[])