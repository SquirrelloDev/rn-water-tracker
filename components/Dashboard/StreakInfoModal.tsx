import React from "react";
import Modal from "react-native-modal";
import {
  StyledText,
  StyledView,
} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
interface StreakInfoModalProps {
  currentStreak: number;
  isVisible: boolean;
  toggleInfoModal: () => void;
}
export function StreakInfoModal({
  currentStreak,
  isVisible,
  toggleInfoModal,
}: StreakInfoModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <StyledView className="p-4 rounded-2xl">
        <StyledView className="bg-amber-400 rounded-t-2xl items-center p-4">
          <StyledText className="font-medium text-3xl">
            Twoja aktualna passa
          </StyledText>
          <StyledText className="font-bold text-5xl my-3">
            {currentStreak}
          </StyledText>
        </StyledView>
        <StyledView className="bg-white p-4">
          <StyledText className="font-bold text-2xl">Jak to działa?</StyledText>
          <StyledText className="my-1 text-base">Wypełniaj dzienne cele w spożyciu wody, aby zwiększyć wynik swojej passy.</StyledText>
          <StyledText className="my-1 text-base">Uważaj! Jeśli zapomnisz wypełnić swój cel, twoja cała passa przepada!</StyledText>
          <StyledText className="my-1 text-base">Aby nie zapomnieć o swojej passie, zezwól na powiadomienia w ustawieniach</StyledText>
        </StyledView>
        <StyledView className="bg-white rounded-b-2xl">
          <CustomButton title={"Do dzieła!"} onPress={toggleInfoModal} />
        </StyledView>
      </StyledView>
    </Modal>
  );
}
