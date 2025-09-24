import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function AboutUs() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  const team = [
    { name: "Soyam Patra", role: "AI/ML Engineer", github: "https://github.com/" },
    { name: "Bibhudutta Panda", role: "Backend Developer", github: "https://github.com/" },
    { name: "Arpita Mahapatra", role: "UI/UX Designer", github: "https://github.com/" },
    { name: "Sailen Sahoo", role: "App Developer", github: "https://github.com/" },
    { name: "Nipuna Mahakur", role: "Frontend Developer", github: "https://github.com/" },
    { name: "Ashutosh Badapanda", role: "Frontend Developer", github: "https://github.com/" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FCF5E3",paddingTop:"5%" }}>
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
          marginBottom: "5%"
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#045633",
            textAlign: "center",
            marginBottom: 20,
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
            padding: 20,
            marginLeft:"4%",
            marginRight:"4%",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Montserrat",
              fontWeight: "600",
              color: "#045633",
              textAlign: "center",
              padding: "3%"
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
            resizeMode: "contain",
          }}
        />
        </LinearGradient>
        </View>

        {/* Team Section */}
        <Text
          style={{
            fontSize: 20,
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
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#333" }}>
                {member.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#555" }}>{member.role}</Text>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL(member.github)}>
              <Image
                // source={require("../assets/images/nipuna.jpg")} // your github icon
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};