import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import BackButton from '../../components/BackButton';

const steps = [
  {
    id: 'basics',
    label: 'Client basics',
    fields: ['fullName', 'email', 'age', 'company', 'projectType', 'terms'],
  },
  {
    id: 'project',
    label: 'Project details',
    fields: ['budget', 'timeline', 'features', 'city', 'country', 'teamSize'],
  },
  {
    id: 'extras',
    label: 'Preferences',
    fields: ['risk', 'newsletter', 'notes'],
  },
];

const defaultValues = {
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  age: 29,
  company: 'Acme Labs',
  projectType: 'app',
  terms: false,
  budget: 25000,
  timeline: '8-12 weeks',
  features: {
    ai: true,
    payments: true,
    auth: true,
    analytics: false,
  },
  city: 'San Francisco',
  country: 'United States',
  teamSize: 6,
  risk: 'balanced',
  newsletter: true,
  notes: 'We’d like to ship a private beta in Q3.',
};

const SectionHeader = ({ title, subtitle }) => (
  <Box>
    <Typography variant="h5" fontWeight={700} color="#0f172a">
      {title}
    </Typography>
    <Typography variant="body2" color="#4b5563">
      {subtitle}
    </Typography>
  </Box>
);

const StepChips = ({ active }) => (
  <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
    {steps.map((step, idx) => {
      const isActive = idx === active;
      const isDone = idx < active;
      return (
        <Chip
          key={step.id}
          label={`${idx + 1}. ${step.label}`}
          color={isActive ? 'primary' : 'default'}
          variant={isDone ? 'outlined' : isActive ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: isActive ? '#0f172a' : '#ffffff',
            color: isActive ? '#ffffff' : '#0f172a',
            borderColor: isActive ? '#0f172a' : '#e2e8f0',
            fontWeight: 700,
          }}
        />
      );
    })}
  </Stack>
);

const FormDebugger = ({ control }) => {
  const values = useWatch({ control });
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: '#0f172a',
        color: '#e2e8f0',
        border: '1px solid #1f2937',
        boxShadow: '0 14px 28px rgba(0,0,0,0.18)',
        height: '100%',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700}>
        Live form state
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 1.25,
          borderRadius: 1.5,
          bgcolor: '#111827',
          color: '#cbd5f5',
          fontSize: 12,
          lineHeight: 1.5,
          maxHeight: 280,
          maxWidth: '100%',
          width: '100%',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {JSON.stringify(values, null, 2)}
      </Box>
    </Box>
  );
};

const ClientForm = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = methods;
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currentStepFields = useMemo(
    () => steps[activeStep]?.fields ?? [],
    [activeStep]
  );

  const goNext = async () => {
    const ok = await trigger(currentStepFields, { shouldFocus: true });
    if (!ok) return;
    setSubmitted(null);
    setHasSubmitted(false);
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => {
    setSubmitted(null);
    setHasSubmitted(false);
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = async (data) => {
    const ok = await trigger(currentStepFields, { shouldFocus: true });
    if (!ok) return;
    setSubmitted(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f8fafc',
          px: { xs: 1.5, md: 3 },
          py: { xs: 2.5, md: 4 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BackButton />
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
            gap: { xs: 2, md: 3 },
            alignItems: 'start',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                e.target &&
                e.target.tagName !== 'TEXTAREA'
              ) {
                e.preventDefault();
                if (activeStep < steps.length - 1) {
                  goNext();
                }
              }
            }}
            sx={{
              bgcolor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 2,
              boxShadow: '0 20px 38px rgba(15,23,42,0.12)',
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <SectionHeader
              title="Client onboarding via React Hook Form"
              subtitle="Validations, defaults, multi-step, and live state."
            />

            <StepChips active={activeStep} />

            {activeStep === 0 && (
              <Stack spacing={2}>
                <TextField
                  label="Full name"
                  placeholder="Jane Doe"
                  fullWidth
                  {...register('fullName', {
                    required: 'Name is required',
                    minLength: { value: 3, message: 'Min 3 characters' },
                  })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
                <TextField
                  label="Work email"
                  placeholder="name@company.com"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    type="number"
                    label="Team size"
                    fullWidth
                    inputProps={{ min: 1, max: 50 }}
                    {...register('teamSize', {
                      valueAsNumber: true,
                      required: 'Team size required',
                      min: { value: 1, message: 'Min 1' },
                      max: { value: 50, message: 'Max 50' },
                    })}
                    error={!!errors.teamSize}
                    helperText={errors.teamSize?.message}
                  />
                  <TextField
                    type="number"
                    label="Age (decision maker)"
                    fullWidth
                    inputProps={{ min: 18, max: 80 }}
                    {...register('age', {
                      valueAsNumber: true,
                      required: 'Age is required',
                      min: { value: 18, message: 'Min 18' },
                      max: { value: 80, message: 'Max 80' },
                    })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                </Stack>
                <TextField
                  label="Company (optional)"
                  fullWidth
                  {...register('company')}
                />
                <FormControl fullWidth error={!!errors.projectType}>
                  <InputLabel id="project-type-label">Project type</InputLabel>
                  <Select
                    labelId="project-type-label"
                    label="Project type"
                    defaultValue={defaultValues.projectType}
                    {...register('projectType', {
                      required: 'Select a project type',
                    })}
                  >
                    <MenuItem value="app">Web / mobile app</MenuItem>
                    <MenuItem value="site">Marketing site</MenuItem>
                    <MenuItem value="dashboard">Internal dashboard</MenuItem>
                    <MenuItem value="api">API / backend</MenuItem>
                  </Select>
                  <FormHelperText>{errors.projectType?.message}</FormHelperText>
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('terms', {
                        required: 'You must accept the engagement terms',
                      })}
                      color="primary"
                    />
                  }
                  label="I agree to the engagement terms"
                />
                <FormHelperText error>{errors.terms?.message}</FormHelperText>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    type="number"
                    label="Budget (USD)"
                    fullWidth
                    inputProps={{ min: 5000, max: 500000, step: 500 }}
                    {...register('budget', {
                      valueAsNumber: true,
                      required: 'Budget required',
                      min: { value: 5000, message: 'Min 5k' },
                      max: { value: 500000, message: 'Max 500k' },
                    })}
                    error={!!errors.budget}
                    helperText={errors.budget?.message}
                  />
                  <FormControl fullWidth error={!!errors.timeline}>
                    <InputLabel id="timeline-label">Timeline</InputLabel>
                    <Select
                      labelId="timeline-label"
                      label="Timeline"
                      defaultValue={defaultValues.timeline}
                      {...register('timeline', {
                        required: 'Select a timeline',
                      })}
                    >
                      <MenuItem value="4-6 weeks">4-6 weeks</MenuItem>
                      <MenuItem value="8-12 weeks">8-12 weeks</MenuItem>
                      <MenuItem value="12-16 weeks">12-16 weeks</MenuItem>
                    </Select>
                    <FormHelperText>{errors.timeline?.message}</FormHelperText>
                  </FormControl>
                </Stack>

                <Controller
                  control={control}
                  name="features"
                  render={({ field }) => (
                    <Stack
                      sx={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 2,
                        p: 2,
                        bgcolor: '#f8fafc',
                      }}
                      spacing={1}
                    >
                      <Typography fontWeight={700}>Feature set</Typography>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                      >
                        {[
                          { key: 'ai', label: 'AI assist' },
                          { key: 'payments', label: 'Payments' },
                          { key: 'auth', label: 'Auth' },
                          { key: 'analytics', label: 'Analytics' },
                        ].map((item) => (
                          <FormControlLabel
                            key={item.key}
                            control={
                              <Checkbox
                                checked={field.value?.[item.key] ?? false}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    [item.key]: e.target.checked,
                                  })
                                }
                              />
                            }
                            label={item.label}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  )}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="City"
                    fullWidth
                    {...register('city', {
                      required: 'City is required',
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                  <TextField
                    label="Country"
                    fullWidth
                    {...register('country', {
                      required: 'Country is required',
                    })}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                </Stack>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2}>
                <FormControl component="fieldset">
                  <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                    Risk tolerance
                  </Typography>
                  <Controller
                    control={control}
                    name="risk"
                    rules={{ required: 'Select a risk profile' }}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="steady"
                          control={<Radio />}
                          label="Steady"
                        />
                        <FormControlLabel
                          value="balanced"
                          control={<Radio />}
                          label="Balanced"
                        />
                        <FormControlLabel
                          value="bold"
                          control={<Radio />}
                          label="Bold"
                        />
                      </RadioGroup>
                    )}
                  />
                  <FormHelperText error>{errors.risk?.message}</FormHelperText>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('newsletter')}
                      defaultChecked={defaultValues.newsletter}
                    />
                  }
                  label="Send me build updates"
                />

                <TextField
                  label="Notes (optional)"
                  multiline
                  minRows={3}
                  maxRows={6}
                  fullWidth
                  {...register('notes', {
                    maxLength: {
                      value: 400,
                      message: 'Max 400 characters',
                    },
                  })}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                />
              </Stack>
            )}

            <Divider />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={goBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                sx={{ flexWrap: 'wrap' }}
              >
                <Button
                  type="button"
                  variant="text"
                  onClick={() => {
                    reset(defaultValues);
                    setSubmitted(null);
                    setHasSubmitted(false);
                  }}
                  disabled={isSubmitting}
                >
                  Reset defaults
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={goNext}
                    sx={{ backgroundColor: '#0f172a' }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={() => setHasSubmitted(true)}
                    sx={{ backgroundColor: '#0f172a' }}
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Stack>

            {hasSubmitted && submitted && (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#ecfdf3',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                  Submitted!
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Here’s what we captured:
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1.25,
                    borderRadius: 1.5,
                    bgcolor: '#f0fdf4',
                    border: '1px solid #dcfce7',
                    maxHeight: 240,
                    maxWidth: '100%',
                    width: '100%',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(submitted, null, 2)}
                </Box>
              </Box>
            )}
          </Box>

          <FormDebugger control={control} />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ClientForm;
