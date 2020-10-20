import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';
import { Button, LinearProgress } from '@material-ui/core';
import { Row, Col, Container } from 'react-bootstrap';
import { TimePicker, DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

class AgencyReq extends React.Component {
  state = {
    languageL: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/languages/')
      .then((res) => {
        this.setState({
          languageL: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { languageL } = this.state;
    return (
      <>
        <Formik
          initialValues={{
            startTime: '',
            endTime: '',
            encounterDate: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              axios.post('http://localhost:8000/api/agencyReqs/create', {
                values,
              });
              console.log({ values });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, handleChange, isSubmitting, touched }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Container className=' card align-items-center justify-content-arround'>
                <h2 className='header'>Agency Requests</h2>

                <Form>
                  <Row className='mt-5'>
                    <Col>
                      <Field
                        name='agnecy'
                        component={Autocomplete}
                        options={agencyList}
                        getOptionLabel={(option: any) => option.label}
                        style={{ width: 300 }}
                        renderInput={(
                          params: AutocompleteRenderInputParams
                        ) => (
                          <MuiTextField
                            {...params}
                            label='Agency'
                            variant='outlined'
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <Field
                        name='language'
                        component={Autocomplete}
                        options={languageL}
                        getOptionLabel={(option: any) => option.language}
                        style={{ width: 300 }}
                        renderInput={(
                          params: AutocompleteRenderInputParams
                        ) => (
                          <MuiTextField
                            {...params}
                            label='Language'
                            variant='outlined'
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col>
                      <Field
                        name='location'
                        component={Autocomplete}
                        options={locationList}
                        getOptionLabel={(option: any) => option.label}
                        style={{ width: 300 }}
                        renderInput={(
                          params: AutocompleteRenderInputParams
                        ) => (
                          <MuiTextField
                            {...params}
                            label='Location'
                            variant='outlined'
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <Field
                        name='clinic'
                        component={Autocomplete}
                        options={clinics}
                        getOptionLabel={(option: any) => option['Dep/Prog']}
                        style={{ width: 300 }}
                        renderInput={(
                          params: AutocompleteRenderInputParams
                        ) => (
                          <MuiTextField
                            {...params}
                            label='Clinic'
                            variant='outlined'
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <br />
                  {isSubmitting && <LinearProgress />}
                  <Row className='mt-2'>
                    <Col>
                      <Field
                        component={DatePicker}
                        name='encounterDate'
                        label='Date:'
                      />
                    </Col>
                    <Col>
                      <Field
                        component={TimePicker}
                        name='startTime'
                        label='From:'
                      />
                    </Col>
                    <Col>
                      <Field
                        component={TimePicker}
                        name='endTime'
                        label='To:'
                      />
                    </Col>
                  </Row>
                  <div className='text-center m-3'>
                    <Button
                      variant='contained'
                      color='primary'
                      disabled={isSubmitting}
                      type='submit'
                      className='btn btn-lg btn-block'
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Container>
            </MuiPickersUtilsProvider>
          )}
        </Formik>
      </>
    );
  }
}

export default AgencyReq;

//Constants

const locationList = [
  {
    label: 'Main Campus',
    id: 1,
    address: '300 Longwood Ave, Boston, MA 02115',
  },

  { label: 'Waltham', id: 2, address: '9 Hope Ave' },
];

const clinics = [
  {
    'Dep. Id': 627,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'BOSTON',
    'Phone#': '781-657-9495',
  },
  {
    'Dep. Id': 625,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9636',
  },
  {
    'Dep. Id': 914,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9664',
  },
  {
    'Dep. Id': 931,
    'Dep/Prog': 'UROLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9669',
  },
  {
    'Dep. Id': 930,
    'Dep/Prog': 'SURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9684',
  },
  {
    'Dep. Id': 959,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9711',
  },
  {
    'Dep. Id': 610,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9719',
  },
  {
    'Dep. Id': 954,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'BOSTON',
    'Phone#': '781-657-9761',
  },
  {
    'Dep. Id': 299,
    'Dep/Prog': 'OPTIMAL WELLNESS FOR LIFE',
    Location: 'BOSTON',
    'Phone#': '781-657-9781',
  },
  {
    'Dep. Id': 297,
    'Dep/Prog': 'OPTIMAL WELLNESS NUTRITION',
    Location: 'BOSTON',
    'Phone#': '781-657-9782',
  },
  {
    'Dep. Id': 932,
    'Dep/Prog': 'PLASTICS',
    Location: 'BOSTON',
    'Phone#': '781-657-9790',
  },
  {
    'Dep. Id': 953,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'BOSTON',
    'Phone#': '781-657-9793',
  },
  {
    'Dep. Id': 8,
    'Dep/Prog': 'CLEFT LIP PALATE',
    Location: 'BOSTON',
    'Phone#': '781-657-9694',
  },
  {
    'Dep. Id': 55,
    'Dep/Prog': 'CP MEDICAL',
    Location: 'BOSTON',
    'Phone#': '781-657-9486',
  },
  {
    'Dep. Id': 56,
    'Dep/Prog': 'CEREBRAL PALSY',
    Location: 'BOSTON',
    'Phone#': '781-657-9487',
  },
  {
    'Dep. Id': 177,
    'Dep/Prog': 'COMPLEX HAND',
    Location: 'BOSTON',
    'Phone#': '781-657-9488',
  },
  {
    'Dep. Id': 449,
    'Dep/Prog': 'COMPLEX SPINE',
    Location: 'BOSTON',
    'Phone#': '781-657-9489',
  },
  {
    'Dep. Id': 43,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'BOSTON',
    'Phone#': '781-657-9494',
  },
  {
    'Dep. Id': 73,
    'Dep/Prog': 'PODIATRY',
    Location: 'BOSTON',
    'Phone#': '781-657-9499',
  },
  {
    'Dep. Id': 48,
    'Dep/Prog': 'SPINAL PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9500',
  },
  {
    'Dep. Id': 242,
    'Dep/Prog': 'UPPER EXTREMITIES',
    Location: 'BOSTON',
    'Phone#': '781-657-9501',
  },
  {
    'Dep. Id': 76,
    'Dep/Prog': 'PLASTIC HAND',
    Location: 'BOSTON',
    'Phone#': '781-657-9502',
  },
  {
    'Dep. Id': 944,
    'Dep/Prog': 'X-RAY BOSTON',
    Location: 'BOSTON',
    'Phone#': '781-657-9503',
  },
  {
    'Dep. Id': 38,
    'Dep/Prog': 'NEUROSURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9777',
  },
  {
    'Dep. Id': 168,
    'Dep/Prog': 'ORAL SURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9789',
  },
  {
    'Dep. Id': 111,
    'Dep/Prog': 'VASCULAR ANOMALIES',
    Location: 'BOSTON',
    'Phone#': '781-657-9792',
  },
  {
    'Dep. Id': 53,
    'Dep/Prog': 'MYELODYSPLASIA',
    Location: 'BOSTON',
    'Phone#': '781-657-9795',
  },
  {
    'Dep. Id': 624,
    'Dep/Prog': 'FEEDING TEAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9763',
  },
  {
    'Dep. Id': 901,
    'Dep/Prog': 'CHILD PROTECTION TEAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9765',
  },
  {
    'Dep. Id': 83,
    'Dep/Prog': 'FAMILY DEVELOPMENT',
    Location: 'BOSTON',
    'Phone#': '781-657-9766',
  },
  {
    'Dep. Id': 9,
    'Dep/Prog': 'HEMATOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9769',
  },
  {
    'Dep. Id': 179,
    'Dep/Prog': 'HEMOPHILIA COMP',
    Location: 'BOSTON',
    'Phone#': '781-657-9770',
  },
  {
    'Dep. Id': 20,
    'Dep/Prog': 'LEARNING DISABILITIES',
    Location: 'BOSTON',
    'Phone#': '781-657-9774',
  },
  {
    'Dep. Id': 23,
    'Dep/Prog': 'EPILEPSY PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9775',
  },
  {
    'Dep. Id': 24,
    'Dep/Prog': 'NEUROPHYSIOLOGY LAB',
    Location: 'BOSTON',
    'Phone#': '781-657-9776',
  },
  {
    'Dep. Id': 7,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'BOSTON',
    'Phone#': '781-657-9725',
  },
  {
    'Dep. Id': 602,
    'Dep/Prog': 'ADOPTION PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9728',
  },
  {
    'Dep. Id': 525,
    'Dep/Prog': 'INTERNATIONAL HEALTH',
    Location: 'BOSTON',
    'Phone#': '781-657-9729',
  },
  {
    'Dep. Id': 520,
    'Dep/Prog': "CENTER FOR INT'L SVCS",
    Location: 'BOSTON',
    'Phone#': '781-657-9730',
  },
  {
    'Dep. Id': 106,
    'Dep/Prog': 'DIALYSIS',
    Location: 'BOSTON',
    'Phone#': '781-657-9737',
  },
  {
    'Dep. Id': 176,
    'Dep/Prog': 'PERITONEAL DIALYSIS',
    Location: 'BOSTON',
    'Phone#': '781-657-9738',
  },
  {
    'Dep. Id': 28,
    'Dep/Prog': 'RENAL TRANSPLANT',
    Location: 'BOSTON',
    'Phone#': '781-657-9739',
  },
  {
    'Dep. Id': 629,
    'Dep/Prog': 'OCCUPATIONAL THERAPY',
    Location: 'BOSTON',
    'Phone#': '781-657-9740',
  },
  {
    'Dep. Id': 628,
    'Dep/Prog': 'PHYSICAL THERAPY',
    Location: 'BOSTON',
    'Phone#': '781-657-9741',
  },
  {
    'Dep. Id': 630,
    'Dep/Prog': 'PT BALLET CLINIC',
    Location: 'BOSTON',
    'Phone#': '781-657-9742',
  },
  {
    'Dep. Id': 15,
    'Dep/Prog': 'PULMONARY',
    Location: 'BOSTON',
    'Phone#': '781-657-9746',
  },
  {
    'Dep. Id': 166,
    'Dep/Prog': 'PULMONARY DOLOSA',
    Location: 'BOSTON',
    'Phone#': '781-657-9747',
  },
  {
    'Dep. Id': 2,
    'Dep/Prog': 'ALLERGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9749',
  },
  {
    'Dep. Id': 5,
    'Dep/Prog': 'DERMATOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9751',
  },
  {
    'Dep. Id': 44,
    'Dep/Prog': 'RHEUMATOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9752',
  },
  {
    'Dep. Id': 208,
    'Dep/Prog': 'CENTER FOR AMBULATORY TRANSFUSION AND TREATMENT',
    Location: 'BOSTON',
    'Phone#': '781-657-9753',
  },
  {
    'Dep. Id': 207,
    'Dep/Prog': 'CENTER FOR CLINICAL RESEARCH',
    Location: 'BOSTON',
    'Phone#': '781-657-9754',
  },
  {
    'Dep. Id': 626,
    'Dep/Prog': 'DEVELOPMENTAL MED CTR',
    Location: 'BOSTON',
    'Phone#': '781-657-9757',
  },
  {
    'Dep. Id': 25,
    'Dep/Prog': 'DEVELOPMENTAL EVALUATION',
    Location: 'BOSTON',
    'Phone#': '781-657-9758',
  },
  {
    'Dep. Id': 615,
    'Dep/Prog': 'CARDIAC SURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9716',
  },
  {
    'Dep. Id': 614,
    'Dep/Prog': 'CARDIAC CATHETERIZATION',
    Location: 'BOSTON',
    'Phone#': '781-657-9717',
  },
  {
    'Dep. Id': 619,
    'Dep/Prog': 'CARDIOLOGY SCHEDULING',
    Location: 'BOSTON',
    'Phone#': '781-657-9718',
  },
  {
    'Dep. Id': 149,
    'Dep/Prog': 'SUBSTANCE ABUSE SERV',
    Location: 'BOSTON',
    'Phone#': '781-657-9558',
  },
  {
    'Dep. Id': 3,
    'Dep/Prog': 'CARDIOLOGY (003)',
    Location: 'BOSTON',
    'Phone#': '781-657-9599',
  },
  {
    'Dep. Id': 404,
    'Dep/Prog': 'CARDIOLOGYMILFORD',
    Location: 'BOSTON',
    'Phone#': '781-657-9603',
  },
  {
    'Dep. Id': 617,
    'Dep/Prog': 'LIPID',
    Location: 'BOSTON',
    'Phone#': '781-657-9604',
  },
  {
    'Dep. Id': 61,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9635',
  },
  {
    'Dep. Id': 138,
    'Dep/Prog': 'OPTOMETRY',
    Location: 'BOSTON',
    'Phone#': '781-657-9641',
  },
  {
    'Dep. Id': 161,
    'Dep/Prog': 'VISUAL FUNCTION',
    Location: 'BOSTON',
    'Phone#': '781-657-9642',
  },
  {
    'Dep. Id': 57,
    'Dep/Prog': 'CH PRIMARY CARE CTR',
    Location: 'BOSTON',
    'Phone#': '781-657-9644',
  },
  {
    'Dep. Id': 125,
    'Dep/Prog': 'YOUNG PARENT PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9646',
  },
  {
    'Dep. Id': 251,
    'Dep/Prog': 'ASK PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9647',
  },
  {
    'Dep. Id': 191,
    'Dep/Prog': 'INTERNATIONAL MED HOME',
    Location: 'BOSTON',
    'Phone#': '781-657-9648',
  },
  {
    'Dep. Id': 124,
    'Dep/Prog': 'PEDIATRIC CONSULT PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9649',
  },
  {
    'Dep. Id': 926,
    'Dep/Prog': 'SPORTS MEDICINE',
    Location: 'BOSTON',
    'Phone#': '781-657-9656',
  },
  {
    'Dep. Id': 33,
    'Dep/Prog': 'GENERAL SURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9657',
  },
  {
    'Dep. Id': 32,
    'Dep/Prog': 'PLASTIC SURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9659',
  },
  {
    'Dep. Id': 30,
    'Dep/Prog': 'SURGICAL NURSE',
    Location: 'BOSTON',
    'Phone#': '781-657-9660',
  },
  {
    'Dep. Id': 31,
    'Dep/Prog': 'UROLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9662',
  },
  {
    'Dep. Id': 18,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9663',
  },
  {
    'Dep. Id': 129,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9674',
  },
  {
    'Dep. Id': 59,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9676',
  },
  {
    'Dep. Id': 164,
    'Dep/Prog': 'GENDER MANAGEMENT SRVC',
    Location: 'BOSTON',
    'Phone#': '781-657-9678',
  },
  {
    'Dep. Id': 181,
    'Dep/Prog': 'ESOPHAGEAL ATRESIA',
    Location: 'BOSTON',
    'Phone#': '781-657-9682',
  },
  {
    'Dep. Id': 190,
    'Dep/Prog': 'PELVIC MALFORMATION',
    Location: 'BOSTON',
    'Phone#': '781-657-9683',
  },
  {
    'Dep. Id': 173,
    'Dep/Prog': 'HYPERTENSION PROGRAM',
    Location: 'BOSTON',
    'Phone#': '781-657-9686',
  },
  {
    'Dep. Id': 11,
    'Dep/Prog': 'RENAL',
    Location: 'BOSTON',
    'Phone#': '781-657-9687',
  },
  {
    'Dep. Id': 69,
    'Dep/Prog': 'CRANIOFACIAL',
    Location: 'BOSTON',
    'Phone#': '781-657-9696',
  },
  {
    'Dep. Id': 39,
    'Dep/Prog': 'SOCIAL WORK',
    Location: 'BOSTON',
    'Phone#': '781-657-9701',
  },
  {
    'Dep. Id': 900,
    'Dep/Prog': 'LUNG TRANSPLANT',
    Location: 'BOSTON',
    'Phone#': '781-657-9703',
  },
  {
    'Dep. Id': 84,
    'Dep/Prog': 'PSYCHOLOGICAL EVALUATION (SPEECH)',
    Location: 'BOSTON',
    'Phone#': '781-657-9707',
  },
  {
    'Dep. Id': 450,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'BEVERLY',
    'Phone#': '781-657-9627',
  },
  {
    'Dep. Id': 454,
    'Dep/Prog': 'PULMONARY',
    Location: 'BEVERLY',
    'Phone#': '781-657-9704',
  },
  {
    'Dep. Id': 451,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'BEVERLY',
    'Phone#': '781-657-9726',
  },
  {
    'Dep. Id': 524,
    'Dep/Prog': 'GENETICS',
    Location: 'CAPECOD',
    'Phone#': '781-657-9734',
  },
  {
    'Dep. Id': 245,
    'Dep/Prog': 'SURGERY',
    Location: 'CONCORD',
    'Phone#': '781-657-9685',
  },
  {
    'Dep. Id': 327,
    'Dep/Prog': 'ORTHOPAEDICS/EXETER',
    Location: 'BOSTON',
    'Phone#': '781-657-9491',
  },
  {
    'Dep. Id': 482,
    'Dep/Prog': 'GI',
    Location: 'FALL RIVER',
    'Phone#': '781-657-9629',
  },
  {
    'Dep. Id': 938,
    'Dep/Prog': 'NEUROSURGERY/FOUND',
    Location: 'BOSTON',
    'Phone#': '781-657-9779',
  },
  {
    'Dep. Id': 927,
    'Dep/Prog': 'ORTHOPAEDICS',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9492',
  },
  {
    'Dep. Id': 611,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9600',
  },
  {
    'Dep. Id': 312,
    'Dep/Prog': 'GI',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9630',
  },
  {
    'Dep. Id': 457,
    'Dep/Prog': 'UROLOGY',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9670',
  },
  {
    'Dep. Id': 315,
    'Dep/Prog': 'PULMONARY',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9705',
  },
  {
    'Dep. Id': 407,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9759',
  },
  {
    'Dep. Id': 434,
    'Dep/Prog': 'SURGERY',
    Location: 'FRAMINGHAM',
    'Phone#': '781-657-9760',
  },
  {
    'Dep. Id': 438,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'GOODSAM',
    'Phone#': '781-657-9595',
  },
  {
    'Dep. Id': 460,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9618',
  },
  {
    'Dep. Id': 461,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9619',
  },
  {
    'Dep. Id': 436,
    'Dep/Prog': 'COMPLEX CARE',
    Location: 'GOODSAM',
    'Phone#': '781-657-9620',
  },
  {
    'Dep. Id': 330,
    'Dep/Prog': 'SURGERY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9621',
  },
  {
    'Dep. Id': 462,
    'Dep/Prog': 'GENETICS',
    Location: 'GOODSAM',
    'Phone#': '781-657-9622',
  },
  {
    'Dep. Id': 463,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9623',
  },
  {
    'Dep. Id': 464,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'GOODSAM',
    'Phone#': '781-657-9624',
  },
  {
    'Dep. Id': 420,
    'Dep/Prog': 'PULMONARY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9625',
  },
  {
    'Dep. Id': 456,
    'Dep/Prog': 'UROLOGY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9626',
  },
  {
    'Dep. Id': 466,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'GOODSAM',
    'Phone#': '781-657-9767',
  },
  {
    'Dep. Id': 328,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'GROTON',
    'Phone#': '781-657-9665',
  },
  {
    'Dep. Id': 77,
    'Dep/Prog': 'ORTHOPEDICS/Hand',
    Location: 'BOSTON',
    'Phone#': '781-657-9496',
  },
  {
    'Dep. Id': 321,
    'Dep/Prog': 'SPORTS MED',
    Location: 'HINGHAM',
    'Phone#': '781-657-9650',
  },
  {
    'Dep. Id': 29,
    'Dep/Prog': 'ALLERGY/IMM/CLIN RESEARCH',
    Location: 'BOSTON',
    'Phone#': '781-657-9750',
  },
  {
    'Dep. Id': 599,
    'Dep/Prog': 'PSYCHIATRY',
    Location: 'INPATIENT',
    'Phone#': '781-657-9698',
  },
  {
    'Dep. Id': 320,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'LDERRY',
    'Phone#': '781-657-9787',
  },
  {
    'Dep. Id': 431,
    'Dep/Prog': 'UROLOGY',
    Location: 'LEOMINSTER',
    'Phone#': '781-657-9671',
  },
  {
    'Dep. Id': 742,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9403',
  },
  {
    'Dep. Id': 745,
    'Dep/Prog': 'DEVELOP MED CTR',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9408',
  },
  {
    'Dep. Id': 746,
    'Dep/Prog': 'INFANT FOLLOWUP',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9420',
  },
  {
    'Dep. Id': 738,
    'Dep/Prog': 'NEUROPHYSIOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9422',
  },
  {
    'Dep. Id': 735,
    'Dep/Prog': 'SLEEP DISORDERS',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9438',
  },
  {
    'Dep. Id': 764,
    'Dep/Prog': 'GENDER MANAGEMENT',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9679',
  },
  {
    'Dep. Id': 700,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9400',
  },
  {
    'Dep. Id': 701,
    'Dep/Prog': 'ALLERGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9401',
  },
  {
    'Dep. Id': 702,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9402',
  },
  {
    'Dep. Id': 703,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9404',
  },
  {
    'Dep. Id': 722,
    'Dep/Prog': 'LIPID',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9405',
  },
  {
    'Dep. Id': 730,
    'Dep/Prog': 'DERM LASER',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9406',
  },
  {
    'Dep. Id': 704,
    'Dep/Prog': 'DERMATOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9407',
  },
  {
    'Dep. Id': 717,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9409',
  },
  {
    'Dep. Id': 792,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9410',
  },
  {
    'Dep. Id': 741,
    'Dep/Prog': 'BREATH TEST',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9411',
  },
  {
    'Dep. Id': 733,
    'Dep/Prog': 'ENDOSCOPY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9412',
  },
  {
    'Dep. Id': 705,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9413',
  },
  {
    'Dep. Id': 739,
    'Dep/Prog': 'COMPLEX CARE',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9414',
  },
  {
    'Dep. Id': 706,
    'Dep/Prog': 'SURGERY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9415',
  },
  {
    'Dep. Id': 737,
    'Dep/Prog': 'GENETICS',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9416',
  },
  {
    'Dep. Id': 720,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9417',
  },
  {
    'Dep. Id': 734,
    'Dep/Prog': 'HEMATOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9418',
  },
  {
    'Dep. Id': 724,
    'Dep/Prog': 'INFUSION',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9419',
  },
  {
    'Dep. Id': 718,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9421',
  },
  {
    'Dep. Id': 743,
    'Dep/Prog': 'NEUROSURGERY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9423',
  },
  {
    'Dep. Id': 726,
    'Dep/Prog': 'NURSE',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9424',
  },
  {
    'Dep. Id': 708,
    'Dep/Prog': 'NUTRITION',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9425',
  },
  {
    'Dep. Id': 799,
    'Dep/Prog': 'OPTIMAL WELLNESS FOR LIFE',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9426',
  },
  {
    'Dep. Id': 740,
    'Dep/Prog': 'OCC THERAPY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9427',
  },
  {
    'Dep. Id': 713,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9428',
  },
  {
    'Dep. Id': 711,
    'Dep/Prog': 'ORAL SURGERY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9429',
  },
  {
    'Dep. Id': 732,
    'Dep/Prog': 'CEREBRAL PALSY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9430',
  },
  {
    'Dep. Id': 714,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9431',
  },
  {
    'Dep. Id': 753,
    'Dep/Prog': 'PLASTER ROOM',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9432',
  },
  {
    'Dep. Id': 715,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9433',
  },
  {
    'Dep. Id': 709,
    'Dep/Prog': 'PHYSICAL THERAPY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9434',
  },
  {
    'Dep. Id': 710,
    'Dep/Prog': 'PLASTICS',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9435',
  },
  {
    'Dep. Id': 712,
    'Dep/Prog': 'PSYCH',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9436',
  },
  {
    'Dep. Id': 721,
    'Dep/Prog': 'PULMONARY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9437',
  },
  {
    'Dep. Id': 707,
    'Dep/Prog': 'RHEUMATOLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9439',
  },
  {
    'Dep. Id': 744,
    'Dep/Prog': 'SOCIAL WORK',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9440',
  },
  {
    'Dep. Id': 719,
    'Dep/Prog': 'SPEECH',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9441',
  },
  {
    'Dep. Id': 731,
    'Dep/Prog': 'SPORTS MEDICINE',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9442',
  },
  {
    'Dep. Id': 750,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9443',
  },
  {
    'Dep. Id': 716,
    'Dep/Prog': 'UROLOGY',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9444',
  },
  {
    'Dep. Id': 747,
    'Dep/Prog': 'RENAL',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9688',
  },
  {
    'Dep. Id': 761,
    'Dep/Prog': 'EYE TESTING',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9690',
  },
  {
    'Dep. Id': 728,
    'Dep/Prog': 'LENS',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9691',
  },
  {
    'Dep. Id': 729,
    'Dep/Prog': 'PAIN',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9692',
  },
  {
    'Dep. Id': 723,
    'Dep/Prog': 'PEDIATRIC ENVIRONMENTAL HEALTH',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9693',
  },
  {
    'Dep. Id': 21,
    'Dep/Prog': 'PRESCHOOL LANG',
    Location: 'LONGWOOD/333',
    'Phone#': '781-657-9706',
  },
  {
    'Dep. Id': 68,
    'Dep/Prog': 'SPEECH AND LANGUAGE',
    Location: 'LONGWOOD/333',
    'Phone#': '781-657-9708',
  },
  {
    'Dep. Id': 130,
    'Dep/Prog': 'SPEECH PATHOLOGY',
    Location: 'LONGWOOD/333',
    'Phone#': '781-657-9709',
  },
  {
    'Dep. Id': 93,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'LONGWOOD/333',
    'Phone#': '781-657-9768',
  },
  {
    'Dep. Id': 211,
    'Dep/Prog': 'GENETICS',
    Location: 'LOWELL',
    'Phone#': '781-657-9735',
  },
  {
    'Dep. Id': 170,
    'Dep/Prog': 'EARLY INTERVENTION',
    Location: 'LWD',
    'Phone#': '781-657-9643',
  },
  {
    'Dep. Id': 477,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'MEE',
    'Phone#': '781-657-9637',
  },
  {
    'Dep. Id': 487,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'MEE',
    'Phone#': '781-657-9638',
  },
  {
    'Dep. Id': 182,
    'Dep/Prog': 'ALLERGY',
    Location: 'MEHC',
    'Phone#': '781-657-9556',
  },
  {
    'Dep. Id': 120,
    'Dep/Prog': 'MENTAL HEALTH',
    Location: 'MEHC',
    'Phone#': '781-657-9557',
  },
  {
    'Dep. Id': 122,
    'Dep/Prog': 'OPTOMETRY',
    Location: 'MEHC',
    'Phone#': '781-657-9559',
  },
  {
    'Dep. Id': 183,
    'Dep/Prog': 'ASK',
    Location: 'MEHC',
    'Phone#': '781-657-9560',
  },
  {
    'Dep. Id': 128,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'MEHC',
    'Phone#': '781-657-9561',
  },
  {
    'Dep. Id': 114,
    'Dep/Prog': 'ADULT',
    Location: 'MEHC',
    'Phone#': '781-657-9562',
  },
  {
    'Dep. Id': 144,
    'Dep/Prog': 'DENTAL SCHOOL PROGRAM',
    Location: 'MEHC',
    'Phone#': '781-657-9563',
  },
  {
    'Dep. Id': 119,
    'Dep/Prog': 'DENTAL',
    Location: 'MEHC',
    'Phone#': '781-657-9564',
  },
  {
    'Dep. Id': 118,
    'Dep/Prog': 'HEARING',
    Location: 'MEHC',
    'Phone#': '781-657-9565',
  },
  {
    'Dep. Id': 117,
    'Dep/Prog': 'NUTRITION',
    Location: 'MEHC',
    'Phone#': '781-657-9566',
  },
  {
    'Dep. Id': 143,
    'Dep/Prog': 'PEDIATRICS',
    Location: 'MEHC',
    'Phone#': '781-657-9567',
  },
  {
    'Dep. Id': 142,
    'Dep/Prog': 'TRIAGE',
    Location: 'MEHC',
    'Phone#': '781-657-9568',
  },
  {
    'Dep. Id': 113,
    'Dep/Prog': "WOMEN'S HEALTH SERVICES",
    Location: 'MEHC',
    'Phone#': '781-657-9569',
  },
  {
    'Dep. Id': 184,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'MEHC',
    'Phone#': '781-657-9666',
  },
  {
    'Dep. Id': 270,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'METHUEN',
    'Phone#': '781-657-9720',
  },
  {
    'Dep. Id': 410,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'MGH',
    'Phone#': '781-657-9601',
  },
  {
    'Dep. Id': 648,
    'Dep/Prog': 'SPORTS MED',
    Location: 'MICHELI CTR',
    'Phone#': '781-657-9651',
  },
  {
    'Dep. Id': 403,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'MILFORD',
    'Phone#': '781-657-9596',
  },
  {
    'Dep. Id': 405,
    'Dep/Prog': 'LIPID',
    Location: 'MILFORD',
    'Phone#': '781-657-9605',
  },
  {
    'Dep. Id': 425,
    'Dep/Prog': 'GI',
    Location: 'MILFORD',
    'Phone#': '781-657-9631',
  },
  {
    'Dep. Id': 439,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'MILFORD',
    'Phone#': '781-657-9667',
  },
  {
    'Dep. Id': 428,
    'Dep/Prog': 'UROLOGY',
    Location: 'MILFORD',
    'Phone#': '781-657-9672',
  },
  {
    'Dep. Id': 437,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'MILFORD',
    'Phone#': '781-657-9727',
  },
  {
    'Dep. Id': 424,
    'Dep/Prog': 'PULMONARY',
    Location: 'MILFORD',
    'Phone#': '781-657-9748',
  },
  {
    'Dep. Id': 595,
    'Dep/Prog': 'SPORTS MED',
    Location: 'MOB WALTHAM',
    'Phone#': '781-657-9652',
  },
  {
    'Dep. Id': 666,
    'Dep/Prog': 'PLASTICS',
    Location: 'MOB WALTHAM',
    'Phone#': '781-657-9744',
  },
  {
    'Dep. Id': 473,
    'Dep/Prog': 'UROLOGY',
    Location: 'NASHUA',
    'Phone#': '781-657-9673',
  },
  {
    'Dep. Id': 616,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'NASHUA',
    'Phone#': '781-657-9721',
  },
  {
    'Dep. Id': 547,
    'Dep/Prog': 'PULMONARY SLEEP',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9517',
  },
  {
    'Dep. Id': 528,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9597',
  },
  {
    'Dep. Id': 548,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9639',
  },
  {
    'Dep. Id': 561,
    'Dep/Prog': 'SPEECH PATHOLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9677',
  },
  {
    'Dep. Id': 558,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9712',
  },
  {
    'Dep. Id': 554,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9762',
  },
  {
    'Dep. Id': 549,
    'Dep/Prog': 'NEUROSURGERY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9778',
  },
  {
    'Dep. Id': 553,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9794',
  },
  {
    'Dep. Id': 543,
    'Dep/Prog': 'ALLERGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9583',
  },
  {
    'Dep. Id': 620,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9584',
  },
  {
    'Dep. Id': 537,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9585',
  },
  {
    'Dep. Id': 542,
    'Dep/Prog': 'COMPLEXCARE',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9586',
  },
  {
    'Dep. Id': 536,
    'Dep/Prog': 'SURGERY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9587',
  },
  {
    'Dep. Id': 319,
    'Dep/Prog': 'GENETICS',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9588',
  },
  {
    'Dep. Id': 538,
    'Dep/Prog': 'RENAL',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9589',
  },
  {
    'Dep. Id': 539,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9590',
  },
  {
    'Dep. Id': 560,
    'Dep/Prog': 'NURSE',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9591',
  },
  {
    'Dep. Id': 563,
    'Dep/Prog': 'NUTRITION',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9592',
  },
  {
    'Dep. Id': 541,
    'Dep/Prog': 'PULMONARY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9593',
  },
  {
    'Dep. Id': 540,
    'Dep/Prog': 'UROLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9594',
  },
  {
    'Dep. Id': 546,
    'Dep/Prog': 'LIPID',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9606',
  },
  {
    'Dep. Id': 535,
    'Dep/Prog': 'GI',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9632',
  },
  {
    'Dep. Id': 562,
    'Dep/Prog': 'SPORTS MED',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9653',
  },
  {
    'Dep. Id': 557,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9675',
  },
  {
    'Dep. Id': 214,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'NECC',
    'Phone#': '781-657-9668',
  },
  {
    'Dep. Id': 54,
    'Dep/Prog': 'MYELODYSPLASIA/NEUROSURGERY',
    Location: 'BOSTON',
    'Phone#': '781-657-9658',
  },
  {
    'Dep. Id': 609,
    'Dep/Prog': 'GENDER MANAGEMENT',
    Location: 'WALTHAM',
    'Phone#': '781-657-9681',
  },
  {
    'Dep. Id': 693,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'WALTHAM',
    'Phone#': '781-657-9510',
  },
  {
    'Dep. Id': 685,
    'Dep/Prog': 'DEVELOP MED CTR',
    Location: 'WALTHAM',
    'Phone#': '781-657-9572',
  },
  {
    'Dep. Id': 650,
    'Dep/Prog': 'NUCLEAR MEDICINE',
    Location: 'WALTHAM',
    'Phone#': '781-657-9724',
  },
  {
    'Dep. Id': 663,
    'Dep/Prog': 'PHYSICAL THERAPY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9784',
  },
  {
    'Dep. Id': 607,
    'Dep/Prog': 'CLINICAL RESEARCH',
    Location: 'WALTHAM',
    'Phone#': '781-657-9755',
  },
  {
    'Dep. Id': 382,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'WORCESTER',
    'Phone#': '781-657-9602',
  },
  {
    'Dep. Id': 380,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'WORCESTER',
    'Phone#': '781-657-9640',
  },
  {
    'Dep. Id': 526,
    'Dep/Prog': 'SPORTS MED',
    Location: 'NORTHEAST.',
    'Phone#': '781-657-9654',
  },
  {
    'Dep. Id': 470,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9611',
  },
  {
    'Dep. Id': 406,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'NORWOOD',
    'Phone#': '781-657-9607',
  },
  {
    'Dep. Id': 613,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9608',
  },
  {
    'Dep. Id': 418,
    'Dep/Prog': 'DEVELOP MED',
    Location: 'NORWOOD',
    'Phone#': '781-657-9609',
  },
  {
    'Dep. Id': 468,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'NORWOOD',
    'Phone#': '781-657-9610',
  },
  {
    'Dep. Id': 419,
    'Dep/Prog': 'SURGERY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9612',
  },
  {
    'Dep. Id': 469,
    'Dep/Prog': 'GENETICS',
    Location: 'NORWOOD',
    'Phone#': '781-657-9613',
  },
  {
    'Dep. Id': 476,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9614',
  },
  {
    'Dep. Id': 432,
    'Dep/Prog': 'PLASTICS',
    Location: 'NORWOOD',
    'Phone#': '781-657-9615',
  },
  {
    'Dep. Id': 471,
    'Dep/Prog': 'PULMONARY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9616',
  },
  {
    'Dep. Id': 472,
    'Dep/Prog': 'UROLOGY',
    Location: 'NORWOOD',
    'Phone#': '781-657-9617',
  },
  {
    'Dep. Id': 421,
    'Dep/Prog': 'RENAL',
    Location: 'NORWOOD',
    'Phone#': '781-657-9689',
  },
  {
    'Dep. Id': 478,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'NORWOOD',
    'Phone#': '781-657-9598',
  },
  {
    'Dep. Id': 500,
    'Dep/Prog': 'PSYCHIATRY',
    Location: 'OUTPATIENT',
    'Phone#': '781-657-9699',
  },
  {
    'Dep. Id': 649,
    'Dep/Prog': 'GROWTH AND NUTR',
    Location: 'WALTHAM',
    'Phone#': '781-657-9514',
  },
  {
    'Dep. Id': 654,
    'Dep/Prog': 'INFANT FOLLOWUP',
    Location: 'WALTHAM',
    'Phone#': '781-657-9516',
  },
  {
    'Dep. Id': 682,
    'Dep/Prog': 'ORTHOPAEDICS',
    Location: 'WALTHAM',
    'Phone#': '781-657-9493',
  },
  {
    'Dep. Id': 670,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'WALTHAM',
    'Phone#': '781-657-9509',
  },
  {
    'Dep. Id': 678,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9511',
  },
  {
    'Dep. Id': 692,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9512',
  },
  {
    'Dep. Id': 641,
    'Dep/Prog': 'BREATH TEST',
    Location: 'WALTHAM',
    'Phone#': '781-657-9513',
  },
  {
    'Dep. Id': 698,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9515',
  },
  {
    'Dep. Id': 694,
    'Dep/Prog': 'SLEEP',
    Location: 'WALTHAM',
    'Phone#': '781-657-9518',
  },
  {
    'Dep. Id': 697,
    'Dep/Prog': 'NURSE',
    Location: 'WALTHAM',
    'Phone#': '781-657-9519',
  },
  {
    'Dep. Id': 669,
    'Dep/Prog': 'PLASTER ROOM',
    Location: 'WALTHAM',
    'Phone#': '781-657-9520',
  },
  {
    'Dep. Id': 683,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9521',
  },
  {
    'Dep. Id': 635,
    'Dep/Prog': 'PULMONARY LAB',
    Location: 'WALTHAM',
    'Phone#': '781-657-9522',
  },
  {
    'Dep. Id': 688,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'WALTHAM',
    'Phone#': '781-657-9524',
  },
  {
    'Dep. Id': 687,
    'Dep/Prog': 'UROLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9525',
  },
  {
    'Dep. Id': 671,
    'Dep/Prog': 'ALLERGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9570',
  },
  {
    'Dep. Id': 672,
    'Dep/Prog': 'DERMATOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9571',
  },
  {
    'Dep. Id': 673,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'WALTHAM',
    'Phone#': '781-657-9573',
  },
  {
    'Dep. Id': 674,
    'Dep/Prog': 'GI',
    Location: 'WALTHAM',
    'Phone#': '781-657-9574',
  },
  {
    'Dep. Id': 679,
    'Dep/Prog': 'SURGERY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9575',
  },
  {
    'Dep. Id': 675,
    'Dep/Prog': 'GENETICS',
    Location: 'WALTHAM',
    'Phone#': '781-657-9576',
  },
  {
    'Dep. Id': 696,
    'Dep/Prog': 'HEMATOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9577',
  },
  {
    'Dep. Id': 677,
    'Dep/Prog': 'RENAL',
    Location: 'WALTHAM',
    'Phone#': '781-657-9578',
  },
  {
    'Dep. Id': 689,
    'Dep/Prog': 'NUTRITION',
    Location: 'WALTHAM',
    'Phone#': '781-657-9579',
  },
  {
    'Dep. Id': 676,
    'Dep/Prog': 'OPTIMAL WELLNESS FOR LIFE',
    Location: 'WALTHAM',
    'Phone#': '781-657-9580',
  },
  {
    'Dep. Id': 695,
    'Dep/Prog': 'PULMONARY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9581',
  },
  {
    'Dep. Id': 699,
    'Dep/Prog': 'RHEUMATOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9582',
  },
  {
    'Dep. Id': 643,
    'Dep/Prog': 'CRANIOFACIAL',
    Location: 'WALTHAM',
    'Phone#': '781-657-9697',
  },
  {
    'Dep. Id': 604,
    'Dep/Prog': 'PSYCHIATRY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9700',
  },
  {
    'Dep. Id': 690,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9710',
  },
  {
    'Dep. Id': 668,
    'Dep/Prog': 'DHHP',
    Location: 'WALTHAM',
    'Phone#': '781-657-9713',
  },
  {
    'Dep. Id': 667,
    'Dep/Prog': 'ACP',
    Location: 'WALTHAM',
    'Phone#': '781-657-9714',
  },
  {
    'Dep. Id': 652,
    'Dep/Prog': 'CT',
    Location: 'WALTHAM',
    'Phone#': '781-657-9722',
  },
  {
    'Dep. Id': 651,
    'Dep/Prog': 'MRI',
    Location: 'WALTHAM',
    'Phone#': '781-657-9723',
  },
  {
    'Dep. Id': 639,
    'Dep/Prog': 'ORAL SURGERY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9743',
  },
  {
    'Dep. Id': 684,
    'Dep/Prog': 'PLASTICS',
    Location: 'WALTHAM',
    'Phone#': '781-657-9745',
  },
  {
    'Dep. Id': 655,
    'Dep/Prog': 'INFUSION',
    Location: 'WALTHAM',
    'Phone#': '781-657-9756',
  },
  {
    'Dep. Id': 662,
    'Dep/Prog': 'FEEDING TEAM',
    Location: 'WALTHAM',
    'Phone#': '781-657-9764',
  },
  {
    'Dep. Id': 633,
    'Dep/Prog': 'LEARNING DISAB',
    Location: 'WALTHAM',
    'Phone#': '781-657-9773',
  },
  {
    'Dep. Id': 664,
    'Dep/Prog': 'OCC THERAPY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9783',
  },
  {
    'Dep. Id': 661,
    'Dep/Prog': 'EYE TESTING',
    Location: 'WALTHAM',
    'Phone#': '781-657-9785',
  },
  {
    'Dep. Id': 681,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'WALTHAM',
    'Phone#': '781-657-9786',
  },
  {
    'Dep. Id': 603,
    'Dep/Prog': 'VASC ANOMALIES',
    Location: 'WALTHAM',
    'Phone#': '781-657-9791',
  },
  {
    'Dep. Id': 653,
    'Dep/Prog': 'SPINA BIFIDA',
    Location: 'WALTHAM',
    'Phone#': '781-657-9796',
  },
  {
    'Dep. Id': 623,
    'Dep/Prog': 'PULMONARY SLEEP',
    Location: 'WALTHAM',
    'Phone#': '781-657-9523',
  },
  {
    'Dep. Id': 429,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9526',
  },
  {
    'Dep. Id': 612,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9528',
  },
  {
    'Dep. Id': 322,
    'Dep/Prog': 'LIPID',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9529',
  },
  {
    'Dep. Id': 354,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9530',
  },
  {
    'Dep. Id': 435,
    'Dep/Prog': 'SURGERY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9531',
  },
  {
    'Dep. Id': 393,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9532',
  },
  {
    'Dep. Id': 361,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9533',
  },
  {
    'Dep. Id': 227,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9534',
  },
  {
    'Dep. Id': 340,
    'Dep/Prog': 'PLASTER ROOM',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9535',
  },
  {
    'Dep. Id': 332,
    'Dep/Prog': 'PLASTICS',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9537',
  },
  {
    'Dep. Id': 325,
    'Dep/Prog': 'SPEECH',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9538',
  },
  {
    'Dep. Id': 353,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9539',
  },
  {
    'Dep. Id': 474,
    'Dep/Prog': 'URODYNAMICS',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9540',
  },
  {
    'Dep. Id': 458,
    'Dep/Prog': 'UROLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9541',
  },
  {
    'Dep. Id': 858,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9542',
  },
  {
    'Dep. Id': 402,
    'Dep/Prog': 'ALLERGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9543',
  },
  {
    'Dep. Id': 316,
    'Dep/Prog': 'DERMATOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9544',
  },
  {
    'Dep. Id': 426,
    'Dep/Prog': 'DEVELOP MED',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9545',
  },
  {
    'Dep. Id': 416,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9546',
  },
  {
    'Dep. Id': 369,
    'Dep/Prog': 'BREATH TEST',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9547',
  },
  {
    'Dep. Id': 323,
    'Dep/Prog': 'GENETICS',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9549',
  },
  {
    'Dep. Id': 465,
    'Dep/Prog': 'HEMATOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9550',
  },
  {
    'Dep. Id': 411,
    'Dep/Prog': 'RENAL',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9551',
  },
  {
    'Dep. Id': 346,
    'Dep/Prog': 'NUTRITION',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9552',
  },
  {
    'Dep. Id': 215,
    'Dep/Prog': 'PULMONARY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9554',
  },
  {
    'Dep. Id': 350,
    'Dep/Prog': 'RHEUMATOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9555',
  },
  {
    'Dep. Id': 440,
    'Dep/Prog': 'SPORTS MED',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9655',
  },
  {
    'Dep. Id': 336,
    'Dep/Prog': 'COMPLEX CARE',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9731',
  },
  {
    'Dep. Id': 467,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9732',
  },
  {
    'Dep. Id': 331,
    'Dep/Prog': 'NEUROSURGERY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9780',
  },
  {
    'Dep. Id': 318,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9527',
  },
  {
    'Dep. Id': 512,
    'Dep/Prog': 'GI',
    Location: 'WILMINGTON',
    'Phone#': '781-657-9634',
  },
  {
    'Dep. Id': 459,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9536',
  },
  {
    'Dep. Id': 212,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9548',
  },
  {
    'Dep. Id': 475,
    'Dep/Prog': 'PULMONARY SLEEP',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9553',
  },
  {
    'Dep. Id': 324,
    'Dep/Prog': 'NEUROPHYSIOLOGY',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9733',
  },
  {
    'Dep. Id': 412,
    'Dep/Prog': 'GI',
    Location: 'WESTFORD',
    'Phone#': '781-657-9633',
  },
  {
    'Dep. Id': 88,
    'Dep/Prog': 'PEDIATRIC HEALTH ASSOCIATES/ SPANISH',
    Location: 'BOSTON',
    'Phone#': '781-657-9645',
  },
  {
    'Dep. Id': 802,
    'Dep/Prog': 'ADOLESCENT',
    Location: 'PEABODY',
    'Phone#': '781-657-9445',
  },
  {
    'Dep. Id': 803,
    'Dep/Prog': 'ALLERGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9446',
  },
  {
    'Dep. Id': 804,
    'Dep/Prog': 'AUDIOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9447',
  },
  {
    'Dep. Id': 848,
    'Dep/Prog': 'CARDIAC TESTING',
    Location: 'PEAB',
    'Phone#': '781-657-9448',
  },
  {
    'Dep. Id': 806,
    'Dep/Prog': 'CARDIOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9449',
  },
  {
    'Dep. Id': 834,
    'Dep/Prog': 'LIPID',
    Location: 'PEABODY',
    'Phone#': '781-657-9450',
  },
  {
    'Dep. Id': 807,
    'Dep/Prog': 'DERMATOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9451',
  },
  {
    'Dep. Id': 826,
    'Dep/Prog': 'DEVELOP MED CTR',
    Location: 'PEABODY',
    'Phone#': '781-657-9452',
  },
  {
    'Dep. Id': 808,
    'Dep/Prog': 'ENDOCRINE',
    Location: 'PEABODY',
    'Phone#': '781-657-9453',
  },
  {
    'Dep. Id': 868,
    'Dep/Prog': 'FLUOROSCOPY',
    Location: 'PEABODY',
    'Phone#': '781-657-9454',
  },
  {
    'Dep. Id': 841,
    'Dep/Prog': 'BREATH TEST',
    Location: 'PEABODY',
    'Phone#': '781-657-9455',
  },
  {
    'Dep. Id': 809,
    'Dep/Prog': 'GASTROENTEROLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9456',
  },
  {
    'Dep. Id': 836,
    'Dep/Prog': 'COMPLEX CARE',
    Location: 'PEABODY',
    'Phone#': '781-657-9457',
  },
  {
    'Dep. Id': 810,
    'Dep/Prog': 'SURGERY',
    Location: 'PEABODY',
    'Phone#': '781-657-9458',
  },
  {
    'Dep. Id': 833,
    'Dep/Prog': 'GENETICS',
    Location: 'PEABODY',
    'Phone#': '781-657-9459',
  },
  {
    'Dep. Id': 811,
    'Dep/Prog': 'GYNECOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9460',
  },
  {
    'Dep. Id': 831,
    'Dep/Prog': 'HEMATOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9461',
  },
  {
    'Dep. Id': 861,
    'Dep/Prog': 'MRI',
    Location: 'PEABODY',
    'Phone#': '781-657-9462',
  },
  {
    'Dep. Id': 829,
    'Dep/Prog': 'RENAL',
    Location: 'PEABODY',
    'Phone#': '781-657-9463',
  },
  {
    'Dep. Id': 812,
    'Dep/Prog': 'NEUROLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9464',
  },
  {
    'Dep. Id': 830,
    'Dep/Prog': 'SLEEP',
    Location: 'PEABODY',
    'Phone#': '781-657-9465',
  },
  {
    'Dep. Id': 832,
    'Dep/Prog': 'NEUROPHYSIOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9466',
  },
  {
    'Dep. Id': 825,
    'Dep/Prog': 'NEUROSURGERY',
    Location: 'PEABODY',
    'Phone#': '781-657-9467',
  },
  {
    'Dep. Id': 821,
    'Dep/Prog': 'NURSE',
    Location: 'PEABODY',
    'Phone#': '781-657-9468',
  },
  {
    'Dep. Id': 822,
    'Dep/Prog': 'NUTRITION',
    Location: 'PEABODY',
    'Phone#': '781-657-9469',
  },
  {
    'Dep. Id': 899,
    'Dep/Prog': 'OPTIMAL WELLNESS FOR LIFE',
    Location: 'PEABODY',
    'Phone#': '781-657-9470',
  },
  {
    'Dep. Id': 846,
    'Dep/Prog': 'OCCUPATIONAL THERAPY',
    Location: 'PBDY',
    'Phone#': '781-657-9471',
  },
  {
    'Dep. Id': 813,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9472',
  },
  {
    'Dep. Id': 815,
    'Dep/Prog': 'ORTHOPEDICS',
    Location: 'PEABODY',
    'Phone#': '781-657-9473',
  },
  {
    'Dep. Id': 840,
    'Dep/Prog': 'PLASTER ROOM',
    Location: 'PEABODY',
    'Phone#': '781-657-9474',
  },
  {
    'Dep. Id': 816,
    'Dep/Prog': 'OTOLARYNGOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9475',
  },
  {
    'Dep. Id': 845,
    'Dep/Prog': 'PHYSICAL THERAPY',
    Location: 'PEABODY',
    'Phone#': '781-657-9476',
  },
  {
    'Dep. Id': 814,
    'Dep/Prog': 'CLEFT LIP/PALATE',
    Location: 'BOSTON',
    'Phone#': '781-657-9477',
  },
  {
    'Dep. Id': 817,
    'Dep/Prog': 'PLASTICS',
    Location: 'PEABODY',
    'Phone#': '781-657-9478',
  },
  {
    'Dep. Id': 823,
    'Dep/Prog': 'PULMONARY',
    Location: 'PEABODY',
    'Phone#': '781-657-9479',
  },
  {
    'Dep. Id': 820,
    'Dep/Prog': 'RHEUMATOLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9480',
  },
  {
    'Dep. Id': 818,
    'Dep/Prog': 'SPEECH',
    Location: 'PEABODY',
    'Phone#': '781-657-9481',
  },
  {
    'Dep. Id': 824,
    'Dep/Prog': 'SPORTS MED',
    Location: 'PEABODY',
    'Phone#': '781-657-9482',
  },
  {
    'Dep. Id': 863,
    'Dep/Prog': 'ULTRASOUND',
    Location: 'PEABODY',
    'Phone#': '781-657-9483',
  },
  {
    'Dep. Id': 835,
    'Dep/Prog': 'URODYNAMICS',
    Location: 'PEABODY',
    'Phone#': '781-657-9484',
  },
  {
    'Dep. Id': 819,
    'Dep/Prog': 'UROLOGY',
    Location: 'PEABODY',
    'Phone#': '781-657-9485',
  },
  {
    'Dep. Id': 65,
    'Dep/Prog': 'GROWTH/ORTHO',
    Location: 'BOSTON',
    'Phone#': '781-657-9490',
  },
  {
    'Dep. Id': 79,
    'Dep/Prog': 'ORTHOPEDICS/PRE-OP',
    Location: 'BOSTON',
    'Phone#': '781-657-9497',
  },
  {
    'Dep. Id': 550,
    'Dep/Prog': 'ORTHOPEDICS/REHABILITATION',
    Location: 'BOSTON',
    'Phone#': '781-657-9498',
  },
  {
    'Dep. Id': 12,
    'Dep/Prog': 'GASTROENTEROLOGY/NUT',
    Location: 'BOSTON',
    'Phone#': '781-657-9628',
  },
  {
    'Dep. Id': 52,
    'Dep/Prog': 'MYELODYSPLASIA/UROLOGY',
    Location: 'BOSTON',
    'Phone#': '781-657-9661',
  },
  {
    'Dep. Id': 837,
    'Dep/Prog': 'GENDER MANAGEMENT',
    Location: 'PEABODY',
    'Phone#': '781-657-9680',
  },
  {
    'Dep. Id': 658,
    'Dep/Prog': 'CLEFT LIP PALATE',
    Location: 'WALTHAM',
    'Phone#': '781-657-9695',
  },
  {
    'Dep. Id': 415,
    'Dep/Prog': 'CYSTIC FIBROSIS',
    Location: 'SOUTH SHORE',
    'Phone#': '781-657-9702',
  },
  {
    'Dep. Id': 923,
    'Dep/Prog': 'GENETICS',
    Location: 'SANDWICH',
    'Phone#': '781-657-9736',
  },
  {
    'Dep. Id': 233,
    'Dep/Prog': 'STONE CLINIC',
    Location: 'RENAL',
    'Phone#': '781-657-9771',
  },
  {
    'Dep. Id': 234,
    'Dep/Prog': 'STONE CLINIC',
    Location: 'UROLOGY',
    'Phone#': '781-657-9772',
  },
  {
    'Dep. Id': 233,
    'Dep/Prog': 'STONE CLINIC/RENAL',
    Location: 'STONE CLINIC/RENAL',
    'Phone#': '781-657-9771',
  },
  {
    'Dep. Id': 234,
    'Dep/Prog': 'STONE CLINIC/UROLOGY',
    Location: 'STONE CLINIC/RENAL',
    'Phone#': '781-657-9772',
  },
  {
    'Dep. Id': 334,
    'Dep/Prog': 'OPHTHALMOLOGY',
    Location: 'TEWKSBRY',
    'Phone#': '781-657-9788',
  },
  {
    'Dep. Id': 749,
    'Dep/Prog': 'X-RAY LEXINGTON',
    Location: 'LEXINGTON',
    'Phone#': '781-657-9504',
  },
  {
    'Dep. Id': 519,
    'Dep/Prog': 'X-RAY NDARTMOUTH',
    Location: 'DARTMOUTH',
    'Phone#': '781-657-9505',
  },
  {
    'Dep. Id': 844,
    'Dep/Prog': 'X-RAY PEABODY',
    Location: 'PEABODY',
    'Phone#': '781-657-9506',
  },
  {
    'Dep. Id': 644,
    'Dep/Prog': 'X-RAY WALTHAM',
    Location: 'WALTHAM',
    'Phone#': '781-657-9507',
  },
  {
    'Dep. Id': 344,
    'Dep/Prog': 'X-RAY WEYMOUTH',
    Location: 'WEYMOUTH',
    'Phone#': '781-657-9508',
  },
  {
    'Dep. Id': 634,
    'Dep/Prog': 'CAPE WALTHAM',
    Location: 'BOSTON',
    'Phone#': '',
  },
];

const agencyList = [
  {
    id: 1,
    val: 'atp',
    label: 'ATP',
  },
  {
    id: 2,
    val: 'massComm',
    label: 'Mass Comm',
  },
  {
    id: 3,
    val: 'partners',
    label: 'Partners',
  },
];
