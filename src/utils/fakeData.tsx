import { genders } from '@/types/enum'
import image_eye_1 from '../assets/eye-images/35164_left.jpeg'
import image_eye_2 from '../assets/eye-images/35164_right.jpeg'
import image_eye_3 from '../assets/eye-images/35175_left.jpeg'

const sUser: IUser = {
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  age: 25,
  phone: '0123456789',
  avatar: 'https://res.cloudinary.com/azurestore/image/upload/v1704305113/edu-genious/oytu8zacowgtzykit27q.png'
}

const patients: IResFormat<IPatient> = {
  totalPages: 2,
  currentPage: 1,
  data: [
    {
      id: '000001',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      age: 35,
      phone: '0987654321',
      address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
      haveResult: true,
      images: [],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000002',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      age: 45,
      phone: '0123456789',
      address: '456 Đường DEF, Quận UVW, Thành phố Hà Nội',
      haveResult: false,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1 Patient Eye 1 Patient Eye 1 Patient Eye 1 Patient Eye 1 Patient Eye 1 ',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '5',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      doctorComment:
        'Bệnh nhân cần theo dõi thêm, Bệnh nhân cần theo dõi thêm, Bệnh nhân cần theo dõi thêm Bệnh nhân cần cần Bệnh nhân cần theo dõi thêm, Bệnh nh nhân cần theo dõi thêm, Bệnh',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000003',
      name: 'Phạm Văn C',
      email: 'phamvanc@example.com',
      age: 25,
      phone: '0909090909',
      address: '789 Đường GHI, Quận PQR, Thành phố Đà Nẵng',
      haveResult: true,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000004',
      name: 'Lê Thị D',
      email: 'lethid@example.com',
      age: 55,
      phone: '0369852147',
      address: '101 Đường JKL, Quận MNO, Thành phố Cần Thơ',
      haveResult: false,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000005',
      name: 'Võ Văn E',
      email: 'vovane@example.com',
      age: 30,
      phone: '0888888888',
      address: '222 Đường STU, Quận VWX, Thành phố Hải Phòng',
      haveResult: true,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000006',
      name: 'Hoàng Thị F',
      email: 'hoangthif@example.com',
      age: 40,
      phone: '0777777777',
      address: '333 Đường YZ, Quận KLM, Thành phố Đà Lạt',
      haveResult: false,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000007',
      name: 'Đặng Văn G',
      email: 'dangvang@example.com',
      age: 20,
      phone: '0666666666',
      address: '444 Đường NOP, Quận HIJ, Thành phố Vũng Tàu',
      haveResult: true,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000008',
      name: 'Nguyễn Thị H',
      email: 'nguyenthih@example.com',
      age: 50,
      phone: '0555555555',
      address: '555 Đường QRS, Quận TUV, Thành phố Nha Trang',
      haveResult: false,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000009',
      name: 'Trần Văn I',
      email: 'tranvani@example.com',
      age: 28,
      phone: '0444444444',
      address: '666 Đường WXY, Quận ZAB, Thành phố Huế',
      haveResult: true,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    },
    {
      id: '000010',
      name: 'Lê Văn K',
      email: 'levank@example.com',
      age: 60,
      phone: '0333333333',
      address: '777 Đường CDE, Quận FGH, Thành phố Sài Gòn',
      haveResult: false,
      images: [
        {
          id: '1',
          title: 'Patient Eye 1',
          url: image_eye_1
        },
        {
          id: '2',
          title: 'Patient Eye 2',
          url: image_eye_2
        },
        {
          id: '3',
          title: 'Patient Eye 3',
          url: image_eye_3
        },
        {
          id: '4',
          title: 'Patient Eye 3',
          url: image_eye_3
        }
      ],
      gender: genders.Male,
      doctor: 'BS. Nguyễn Văn B',
      result: [
        {
          title: 'AMD',
          percent: 0.5
        },
        {
          title: 'DR',
          percent: 0.85
        },
        {
          title: 'ERM',
          percent: 0.7
        },
        {
          title: 'GS',
          percent: 0.07
        },
        {
          title: 'RB',
          percent: 99.09
        },
        {
          title: 'RVO',
          percent: 0.05
        }
      ],
      date: '09/03/2024'
    }
  ]
}

export { patients, sUser }
