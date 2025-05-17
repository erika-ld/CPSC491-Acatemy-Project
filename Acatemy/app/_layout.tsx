import { Drawer } from 'expo-router/drawer';
import { TimerProvider } from  '../components/timerContext';
import { CoinsProvider } from  '../components/coinsContext';
import { PetProvider } from "../components/petContext"; // ← ADD THIS


export default function RootLayout() {
 return (
   <CoinsProvider>
     <TimerProvider>
       <PetProvider>
         <Drawer
           screenOptions={{
             headerShown: true,
             drawerLabelStyle: { fontSize: 18 },
           }}
         >
           <Drawer.Screen name="index" options={{ drawerLabel: "Welcome" }} />
           <Drawer.Screen name="home_screen" options={{ drawerLabel: "Home" }} />
           <Drawer.Screen name="login_screen" options={{ drawerLabel: "Login" }} />
           <Drawer.Screen name="pet_customization_screen" options={{ drawerLabel: "Customize Pet" }} />
           <Drawer.Screen name="pet_maker_screen" options={{ drawerLabel: "Create Pet" }} />
           <Drawer.Screen name="register" options={{ drawerLabel: "Sign Up" }} />
           <Drawer.Screen name="rewards_screen" options={{ drawerLabel: "My Rewards" }} />
           <Drawer.Screen name="timer_screen" options={{ drawerLabel: "Focus Timer" }} />
           <Drawer.Screen name="to_do_list_screen" options={{ drawerLabel: "To-Do List" }} />
         </Drawer>
       </PetProvider>
     </TimerProvider>
   </CoinsProvider>
 );
}