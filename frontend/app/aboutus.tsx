import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "@/components/footer";


export default function AboutUs() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  const team = [
  { 
    name: "Soyam Patra", 
    role: "AI/ML Engineer", 
    github: "https://github.com/Soyam-Patra",
    image: require("../assets/images/soyam.jpg")
  },
  { 
    name: "Bibhudutta Panda", 
    role: "Backend Developer", 
    github: "https://github.com/BibhuDev",
    image: require("../assets/images/bibhu.jpg")
  },
  { 
    name: "Arpita Mahapatra", 
    role: "UI/UX Designer", 
    github: "https://github.com/ArpitaM27",
    image: require("../assets/images/arpita.jpg")
  },
  { 
    name: "Sailen Sahoo", 
    role: "Backend Developer", 
    github: "https://github.com/13thAline",
    image: require("../assets/images/sailen.jpg")
  },
  { 
    name: "Nipuna Mahakur", 
    role: "Frontend Developer", 
    github: "https://github.com/nipuna1902",
    image: require("../assets/images/nipuna.jpg")
  },
  { 
    name: "Ashutosh Badapanda", 
    role: "Frontend Developer", 
    github: "https://github.com/fomo-ash",
    image: require("../assets/images/ashutosh.jpg")
  },
];


  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FCF5E3"}}>
      {/* Header */}
      <View
        style={{
          height: 152,
          backgroundColor: "#FFB703",
          borderBottomLeftRadius: 56,
          borderBottomRightRadius: 56,
        }}
      >
        <Image
          source={require("../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
          style={{
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            position: "absolute",
            top: 20,
            left: logoLeftCentered,
            borderRadius: LOGO_RADIUS,
          }}
        />
      </View>

      {/* Title Card */}
      <View
        style={{
          height: 60,
          width: CARD_WIDTH,
          marginTop: -30,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          alignSelf: "center",
          elevation: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 28,
            color: "#045633",
          }}
        >
          About Us
        </Text>
      </View>

      {/* About Section */}
      <View style={{paddingTop: 5}}>
        <Image
          source={require("../assets/images/punjab.png")}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 20,
            marginTop: 10,
            marginBottom: 10,
            zIndex: 2, 
          }}
        />
        <View style={{
          backgroundColor: "#DFE5C6",
          marginLeft:"4%",
          marginRight:"4%",
          borderRadius: 23,
          marginTop: -180,
          zIndex:1,
          paddingTop: "42%",
          marginBottom: "5%",
          padding:"2%"
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            color: "#045633",
            textAlign: "center",
            marginBottom: 20,
            paddingTop:10,
          }}
        >
          Connecting Drivers. Empowering Journeys...
        </Text>
        </View>

        {/* Mission Card */}
        <View>
        <LinearGradient
        colors={["#FFE298", "#FFEAB4"]}
          start={{ x: 0.8, y: 0 }}
          end={{ x: 0.2, y: 1 }}     
          style={{
            backgroundColor: "#FFE298",
            borderRadius: 20,
            marginLeft:"4%",
            marginRight:"4%",
            padding: "3%"
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Montserrat",
              fontWeight: "600",
              color: "#045633",
              textAlign: "center"
            }}
          >
            Our Mission
          </Text>
          <Text style={{ fontSize: 18, color: "#500B14", textAlign: "center" }}>
            Safar Punjab started with one problem statement of SIH and soon became a journey of creative
            brainstorming and shared vision. Today, it stands as our step towards smarter, easier travel.
            Tomorrow, it will grow to reach every corner of Punjab. This is just the beginning of our journey.
          </Text>

          {/* Mission Illustration */}
        <Image
          source={require("../assets/images/mission.png")}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "contain"
          }}
        />
        </LinearGradient>
        </View>

        {/* Team Section */}
        <ScrollView style={{
          margin:"4%"
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#045633",
            marginBottom: 15,
          }}
        >
          Meet The Team
        </Text>

        {team.map((member, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              marginBottom: 10,
              backgroundColor: "#FFF7E6",
              borderRadius: 12,
            }}
          >
            {/* Left side: Profile pic + name + role */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={member.image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12,
                }}
              />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "500", color: "#500B14" }}>
                  {member.name}
                </Text>
                <Text style={{ fontSize: 15, color: "#757575" }}>
                  {member.role}
                </Text>
              </View>
            </View>

            {/* Right side: GitHub icon */}
            <TouchableOpacity onPress={() => Linking.openURL(member.github)}>
              <Image
                source={require("../assets/images/Github.png")}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      <Footer/>
      </ScrollView>
      </View>
    </ScrollView>
  );
};