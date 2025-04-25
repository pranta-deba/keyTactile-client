import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-4">
        Contact Us
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        We'd love to hear from you! Whether it's a product inquiry or just
        saying hi.
      </p>

      <Separator className="mb-10" />

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Store Address
              </h2>
              <p className="text-muted-foreground">
                123 Tactile Street, Switch City, MK 45678
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary">Phone</h2>
              <p className="text-muted-foreground">+1 (800) 555-KEYS</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary">Email</h2>
              <p className="text-muted-foreground">support@keytactile.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary">
                Business Hours
              </h2>
              <p className="text-muted-foreground">
                Mon - Fri: 9AM - 6PM
                <br />
                Sat: 10AM - 4PM
                <br />
                Sun: Closed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md h-full">
          <CardContent className="p-0 h-full">
            <iframe
              title="KeyTactile Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2498024746496!2d91.80788867949387!3d22.360463327155166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd91e817241e3%3A0x560a5f4f0ca98715!2sKhulshi!5e1!3m2!1sen!2sbd!4v1745596439497!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-xl"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
