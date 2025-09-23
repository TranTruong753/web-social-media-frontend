'use client'
import { Box, Button, Container, Step, StepButton, Stepper } from "@mui/material";
import React from "react";
import SignUpForm from "./SignUpForm";
import ActiveForm from "./ActiveForm";

const steps = ['Fill in the form', 'activate account'];

export default function StepSignUp() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Container component="main" maxWidth="sm">

            <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit"
                            disabled
                            // onClick={handleStep(index)}
                        >
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div>
                {/* {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )} */}

                {allStepsCompleted() ? (
                    <React.Fragment>
                        Bạn đã active tài khoản thành công ! quay về trang login
                        <Button onClick={handleReset}>Reset</Button>
                    </React.Fragment>
                ) : (
                    activeStep === 0 &&
                    (<React.Fragment>
                        <SignUpForm  />
                        <Button onClick={handleComplete}>Next</Button>

                    </React.Fragment>) ||
                    activeStep === steps.length - 1 &&
                    (<React.Fragment>
                        <ActiveForm />
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Button onClick={handleComplete}>
                            Active
                        </Button>
                    </React.Fragment>)

                )}

            </div>


        </Container>
    );
}

