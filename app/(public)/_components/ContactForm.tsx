'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Mail, Phone, User, MessageCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

type FormField = keyof FormData;

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    role: ""
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: FormField, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      setShowErrorDialog(true);
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccessDialog(true);
    setIsSubmitting(false);
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: ""
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-center">
              🎉 Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed">
              Thank you for contacting us! We&apos;ve received your message and will get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-center text-red-600">
              ⚠️ Error
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed">
              Please fill in all fields before submitting the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowErrorDialog(false)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-muted/5">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
            <MessageCircle className="h-8 w-8 text-primary" />
            Contact Form
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us about yourself and how we can help you
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">
                I am interested in joining as:
              </Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex-1 cursor-pointer">
                    <div className="font-medium">Student</div>
                    <div className="text-sm text-muted-foreground">
                      I want to learn new skills and advance my career
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="instructor" id="instructor" />
                  <Label htmlFor="instructor" className="flex-1 cursor-pointer">
                    <div className="font-medium">Instructor</div>
                    <div className="text-sm text-muted-foreground">
                      I want to share my expertise and teach others
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}