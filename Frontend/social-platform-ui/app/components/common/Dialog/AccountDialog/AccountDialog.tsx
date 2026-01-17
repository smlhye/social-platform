"use client";

import React, { useState, forwardRef } from "react";
import { Dialog, Slide, Box, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// SlideTransition chuẩn TS
interface SlideTransitionProps extends TransitionProps {
  children: React.ReactElement;
  direction: "left" | "right" | "up" | "down";
}

const SlideTransition = forwardRef<unknown, SlideTransitionProps>(
  function SlideTransition(props, ref) {
    const { direction, ...other } = props;
    return <Slide ref={ref} direction={direction} {...other} />;
  }
);

// Step components
function FormStep({ onNext }: { onNext: () => void }) {
  return (
    <Box>
      <h3>Thông tin cá nhân</h3>
      <Button variant="contained" onClick={onNext}>
        Cập nhật
      </Button>
    </Box>
  );
}

function SuccessStep({ onBack }: { onBack: () => void }) {
  return (
    <Box>
      <h3>Cập nhật thành công!</h3>
      <Button variant="outlined" onClick={onBack}>
        Quay lại
      </Button>
    </Box>
  );
}

// Dialog chính
export default function ProfileDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [initialOpen, setInitialOpen] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [animationKey, setAnimationKey] = useState(0); // key riêng cho Slide

  const handleOpen = () => {
    setOpen(true);
    setStep(0);
    setInitialOpen(true);
    setAnimationKey(0);
  };

  const handleClose = () => setOpen(false);

  const goToStep = (nextStep: number) => {
    if (initialOpen) {
      setStep(nextStep);
      setInitialOpen(false);
      return;
    }

    // xác định hướng slide
    setSlideDirection(nextStep > step ? "left" : "right");

    // mỗi lần đổi step, tăng key để Slide mount lại element mới
    setAnimationKey((k) => k + 1);
    setStep(nextStep);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Mở Dialog
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ overflow: "hidden", position: "relative", width: "100%" }}>
          {initialOpen ? (
            // lần đầu mở
            <Box p={3} sx={{ width: "100%" }}>
              {step === 0 ? (
                <FormStep onNext={() => goToStep(1)} />
              ) : (
                <SuccessStep onBack={() => goToStep(0)} />
              )}
            </Box>
          ) : (
            // Slide animation theo key riêng, không bị lặp
            <SlideTransition
              key={animationKey} // mỗi step một key riêng
              in={true}
              mountOnEnter
              unmountOnExit
              direction={slideDirection}
            >
              <Box p={3} sx={{ width: "100%" }}>
                {step === 0 ? (
                  <FormStep onNext={() => goToStep(1)} />
                ) : (
                  <SuccessStep onBack={() => goToStep(0)} />
                )}
              </Box>
            </SlideTransition>
          )}
        </Box>
      </Dialog>
    </>
  );
}
