
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const InfoSection = () => {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Understanding PCOS</CardTitle>
        <CardDescription>
          Polycystic Ovary Syndrome is a common hormonal disorder affecting women of reproductive age
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="about">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <TabsContent value="about">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What is PCOS?</h3>
                <p>
                  Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. 
                  It's associated with extended menstrual periods or excess male hormone (androgen) levels.
                </p>
                
                <p>
                  The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly 
                  release eggs. The exact cause of PCOS is unknown, but factors may include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Excess insulin – Higher than normal insulin levels can increase androgen production</li>
                  <li>Low-grade inflammation – Research has shown that women with PCOS have a type of low-grade inflammation that stimulates polycystic ovaries to produce androgens</li>
                  <li>Heredity – Research suggests that certain genes might be linked to PCOS</li>
                  <li>Excess androgen – The ovaries produce abnormally high levels of androgen, resulting in hirsutism and acne</li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6">How Common is PCOS?</h3>
                <p>
                  PCOS affects approximately 1 in 10 women of childbearing age. Most women are diagnosed in their 20s and 30s, 
                  when they experience fertility difficulties and seek help to become pregnant. However, PCOS can develop at any age after puberty.
                </p>
                
                <h3 className="text-lg font-semibold mt-6">Associated Health Risks</h3>
                <p>
                  Women with PCOS have a higher risk of developing certain serious health problems, including:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Type 2 diabetes</li>
                  <li>High blood pressure</li>
                  <li>Heart problems</li>
                  <li>Endometrial cancer</li>
                  <li>Sleep apnea</li>
                  <li>Depression and anxiety</li>
                  <li>Abnormal uterine bleeding</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Common Symptoms of PCOS</h3>
                <p>
                  Signs and symptoms of PCOS often develop around the time of the first menstrual period during puberty. 
                  Sometimes PCOS develops later, for example, in response to substantial weight gain.
                </p>
                
                <p>
                  The signs and symptoms of PCOS vary. A diagnosis is usually made when you experience at least two of these signs:
                </p>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h4 className="font-medium text-pcos-600">Irregular periods</h4>
                    <p className="text-muted-foreground mt-1">
                      Infrequent, irregular or prolonged menstrual cycles are the most common sign of PCOS. 
                      For example, you might have fewer than nine periods a year, more than 35 days between periods and abnormally heavy periods.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Excess androgen</h4>
                    <p className="text-muted-foreground mt-1">
                      Elevated levels of male hormones may result in physical signs, such as excess facial and body hair (hirsutism), 
                      and occasionally severe acne and male-pattern baldness.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Polycystic ovaries</h4>
                    <p className="text-muted-foreground mt-1">
                      Your ovaries might be enlarged and contain follicles that surround the eggs. 
                      As a result, the ovaries might fail to function regularly.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6">Additional Symptoms</h3>
                <p>
                  PCOS signs and symptoms are typically more severe in people with obesity. Additional symptoms may include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Weight gain – Up to 80% of people with PCOS are overweight</li>
                  <li>Fatigue – Many women report persistent tiredness</li>
                  <li>Mood swings – Hormone imbalances can cause mood changes, depression and anxiety</li>
                  <li>Pelvic pain – Some women experience pain in the pelvic region</li>
                  <li>Headaches – Hormonal changes can trigger headaches</li>
                  <li>Sleep problems – Including insomnia or sleep apnea</li>
                  <li>Skin tags – Small pieces of excess skin in the armpits or neck area</li>
                  <li>Darkening of skin – Particularly along neck creases, in the groin, and underneath breasts</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="diagnosis">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Diagnosing PCOS</h3>
                <p>
                  There's no single test to diagnose PCOS. Healthcare providers typically use a combination of methods to diagnose the condition:
                </p>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h4 className="font-medium text-pcos-600">Physical exam</h4>
                    <p className="text-muted-foreground mt-1">
                      Your doctor will examine you for signs of excess hair growth, insulin resistance, and acne.
                      They will also check your weight, body mass index (BMI), and vital signs.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Pelvic exam</h4>
                    <p className="text-muted-foreground mt-1">
                      Your doctor might check for swollen ovaries or other growths in your reproductive organs.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Blood tests</h4>
                    <p className="text-muted-foreground mt-1">
                      These tests check your hormone levels, including androgens, and can exclude possible causes of menstrual abnormalities or androgen excess. 
                      Additional blood tests might include fasting cholesterol and triglyceride levels, and glucose tolerance tests.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Ultrasound</h4>
                    <p className="text-muted-foreground mt-1">
                      An ultrasound check can look for abnormal follicles and other problems with the ovaries and pelvic region. 
                      A transvaginal ultrasound is often used for this purpose.
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <h3 className="text-md font-semibold">Rotterdam Criteria</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Many doctors use the Rotterdam criteria for diagnosis, which requires at least two of the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                    <li>Irregular or absent periods</li>
                    <li>Signs of elevated androgens (clinical or biochemical)</li>
                    <li>Polycystic ovaries on ultrasound</li>
                  </ul>
                </div>
                
                <p className="mt-6">
                  It's important to note that other conditions can mimic PCOS, including thyroid disease and elevated 
                  prolactin levels. Your doctor will need to rule these out before making a PCOS diagnosis.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="treatment">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Treatment Options for PCOS</h3>
                <p>
                  Treatment for PCOS focuses on managing your individual concerns, such as infertility, acne, or obesity. 
                  Specific treatment approaches might include:
                </p>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h4 className="font-medium text-pcos-600">Lifestyle changes</h4>
                    <p className="text-muted-foreground mt-1">
                      For many women with PCOS, especially those who are overweight, diet and exercise can help reduce symptoms:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Low-calorie diet if overweight</li>
                      <li>Regular moderate exercise</li>
                      <li>Weight loss (even modest reductions can help)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Medications for menstrual cycle regulation</h4>
                    <p className="text-muted-foreground mt-1">
                      To regulate your menstrual cycle, your doctor might recommend:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Combination birth control pills containing estrogen and progestin</li>
                      <li>Progestin therapy</li>
                      <li>Metformin, which can help with insulin resistance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Medications for ovulation</h4>
                    <p className="text-muted-foreground mt-1">
                      If you're trying to become pregnant, you may need medications to help you ovulate, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Clomiphene</li>
                      <li>Letrozole</li>
                      <li>Metformin</li>
                      <li>Gonadotropins</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-pcos-600">Medications for reducing excessive hair growth</h4>
                    <p className="text-muted-foreground mt-1">
                      Your doctor might recommend:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Birth control pills</li>
                      <li>Spironolactone (Aldactone)</li>
                      <li>Eflornithine (Vaniqa) - a cream that can slow facial hair growth</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <h3 className="text-md font-semibold">Surgery</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    If medications don't work, surgery may be an option:
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ovarian drilling is a procedure that can trigger ovulation in women with PCOS. 
                    It's usually a temporary solution and generally reserved for women who don't respond to medication.
                  </p>
                </div>
                
                <p className="mt-6">
                  Remember that PCOS treatment is highly individualized and may change over time based on your symptoms and whether or not you're 
                  trying to become pregnant. Regular follow-up with healthcare providers is essential for managing PCOS effectively.
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfoSection;
