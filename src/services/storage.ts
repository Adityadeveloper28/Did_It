import AsyncStorage from "@react-native-async-storage/async-storage";
const ACTIONS_KEY = "ACTIONS";


export const saveActions = async(actions:any[])=>{
    try {
        await AsyncStorage.setItem(ACTIONS_KEY,JSON.stringify(actions))
    } catch (error) {
        console.error("Error saving actions to storage:", error);
    }
};

export const loadActions = async()=>{
    try {
        const data = await AsyncStorage.getItem(ACTIONS_KEY);
        if(data){
            return JSON.parse(data);
        }
        return [];      
    } catch (error) {
        console.error("Error loading actions from storage:", error);
        return [];
    }
}