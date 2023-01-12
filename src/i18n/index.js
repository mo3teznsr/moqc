import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ar: {
    translation: {
      'Hello world': 'مرحبا بالعالم',
      "have an account?":"لديك حساب؟",
      'Some text goes here, some more text goes here':
        'بعض النص هنا ، المزيد من النص هنا',
        "something went wrong please check email/password":"حدث خطأ الرجاء التأكد من البريد الإلكتروني وكلمة المرور",
      'Row test': 'اختبار الصف',
      "PM":"مساءاً",
      "AM":"صباحاً",
      "QIBLAH DIRECTION":"اتجاه القبلة",
      "Quibla":"القبلة",
      "Media":"الميديا",
      "Name is required":"الاسم اجباري",
      "Nationality is required":"الرجاء ادخال الجنسية",
      "Date of Birth is required":"تاريخ الميلاد اجباري",
      "Please fill all records":"الرجاء ادخال جميع الحقول",
      "Job is required":"الرجاء ادخال الوظيفة",
      "Contact number is required":"الرجاء ادخال رقم الهاتف",
      "Qualification is required":"المستوى الدراسي اجباري",
      "Memorized Juz is required":"الرجاء ادخال الاجزاء المحفوظة",
      "Voice Recording is required":"التسجيل الصوتي اجباري",
      "Month":"الشهر",
      "Day":"يوم",
      "Year":"السنة",
      "Hour":"ساعة",
      "Minute":"دقيقة",
      "Second":"ثانية",
      "Settings":"الاعدادات",
      "Team Members":"فريق العمل",
      "Team Attendance":"الحضور",
      "UserName":"اسم المستخدم",
      "Update Details":"الحساب",
      "Reset Password":"كلمة المرور",
      "Permissions":"الصلاحيات",
      "None":"بدون",
      "Write":"تعديل",
      "Read":"مشاهدة",
      "Select One":"حدد",
      "No notifications yet":"لاتوجد اشعارات",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      'column 1': 'العمود 1',
      'column 2': 'العمود 2',
      'column 3': 'العمود 3',
      'Textinput test': 'اختبار الإدخال',
      'Testing': 'اختبارات',
      'Change language': 'تغيير اللغة',
      'Go to Inner screen ->': 'انتقل إلى الشاشة الداخلية ->',
      'Home': 'الصفحة الرئيسية',
      "Team": "فريق العمل",
      "IT Dashboard":"لوحة تحكم التقنية",
      "Customer Service":"خدمة العملاء",
      "Teacher Dashboard":"لوحة تحكم المعلم/ة",
      "Create Exams":"إنشاء إختبار",
      "View Classes":"",
      "Name":"الإسم",
      "Email":"البريد الإلكتروني",
      "Phone":"رقم الهاتف",
      "Password":"كلمة المرور",
      "Reject student":"رفض طالب",
      "Action":"اجراء",
      "View":"مشاهدة",
      "Attendance":"الحضور",
      "Select Date":"اختر تاريخ",
      "Note":"ملاحظة",
      "Go":"تقدم",
      "Save":"حفظ",
      "Submit":"تأكيد",
      "Student message":"رسالة الطالب",
      "Student ID":"هوية الطالب",
      "Student Class":"",
      "Student Level":"مستوى الطالب",
      "Microsoft Email":"البريد الإلكتروني الخاص بمايكروسوفت",
      "Student Password":"كلمة مرور الطالب",
      "Student Email":"البريد الإلكتروني للطالب",
      "Update":"تحديث",
      "Class Name":"",
      "Teacher":"مدرس/ة",
      "Create New Class":"",
      "Update Class":"تحديث فصل",
      "Retry":"اعادة المحاولة",
      "English Name":"الاسمة باللغة الإنجليزية",
      "Arabic Name":"الاسم باللغة العربية",
      "You have no Internet Connection":"لا يوجد اتصال انترنت ",
      "Course Name":"اسم المجلس ",
      "Create New Course":"إنشاء مجلس",
      "please rewtire the same password":"الرجاء اعادة إدخال كلمة المرور",
      "Update Course":"تحديث  مجلس",
      "Password confirm":"تأكيد كلمة المرور",
      "REGISTER":"تسجيل",
      "Delete Profile":"حذف الحساب",
      "Apply to memorize system":"التقديم في برنامج التحفيظ",
      "Register":"تسجيل",
      "View All Students":"طلاب المركز",
      "Exams":"الإختبارات",
      "Search":"إبحث",
      "Manages Course":"إدارة المجالس",
      "SIGN IN":"دخول",
      "Do not have an account":"هل لديك حساب",
      "Nationality":"الجنسية",
      "Date of Birth":"تاريخ الميلاد",
      "Username":"اسم المستخدم",
      "Full Name":"الاسم كامل",
      "Gender":"النوع",
      "Date":"التاريخ",
      "Attendance":"الحضور",
      "Created at":"تاريخ الادخال",
      "Result":"النتيجة",
      "Download":"تحميل",
      "First Name":"الإسم",
      "Last Name":"اسم العائلة",
      "Select File":"اختر ملف",
      "Address":"العنوان",
      "Contact Number":"رقم التواصل",
      "PDF":"PDF",
      "Close":"اغلاق",
      "Files upload":"المستندات",
      "Personal Information":"المعلومات الشخصية",
      "Voice Recodring":"التسجيل الصوتي",
      "Video":"فيديو",
      "Audio":"ملف صوتي",
      "Passport":"الجواز",
      "Emirates ID":"الهوية",
      "Expiration Date":"تاريخ الصلاحية",
      "Passport Expiry":"تاريخ صلاحية الجواز",
      "Select your Dashboard and Navigate":"اختر لوحة التحكم",
      "Emirates Expiry":"تاريخ صلاحية الهوية",
      "Reset":"اعادة",
      "Courses":" المجلس",
      "Course":"المجلس",
      "Profile":"الحساب",
      "E-Lessons":"الدروس الألكترونية",
      "Exam":"الإختبارات",
      "Classes":"المستويات",
      "Change Profile Picture":"",
      "Media Cards":"بطافات التواصل",
      "E-Quran":"القرآن الإلكتروني",
      "Logout":"خروج",
      "Home":"الرئيسية",
      "Social Media":"التواصل الاجتماعي",
      "Radio":"الراديو",
      "Dashboard":"لوحة التحكم",
      "MOQC Center News":"مركز الاخبار",
      "Recent Podcasts":"أحدث التدوينات الصوتية",
      "Read More":"المزيد",
      "Published on" : "نشر في",
      "All News":"كل الاخبار",
      "Report":"التقرير",
      "Qiblah":"القبلة",
      "EQURAN":"القرآن الالكتروني",
      "FAJR":"الفجر",
      "DHUHR":"الظهر",
      "Dhuhr":"الظهر",
      "ASR":"العصر",
      "MAGHRIB":"المغرب",
      "ISHA":"العشاء",
      "Fajr":"الفجر",
      "Dhur":"الظهر",
      "Asr":"العصر",
      "Maghrib":"المغرب",
      "Login":"تسجيل الدخول",
      "Isha":"العشاء",
      "Remaining Time for":"الوقت المتبقي لصلاة",
      "Dont have an account?":'هل لديك حساب؟',
      "Members":"الأعضاء",
      "Old Password":"كلمة المرور القديمة",
      "New Password":"كلمة المرور الجديدة",
      "Confirm Password":"تأكيد كلمة المرور",
      "Approve":"موافقة",
      "Reject":"رفض",
      "Country":"الدولة",
      "Contact":"تواصل",
      "Documents":"المستندات",
      "View all Students":"كل الطلاب",
      "Approved Students":"الطلاب المقبولين",
      "Exams":"الامتحانات",
      "Next":"التالي",
      "Previous":"السابق",
      "Suggestion":"المقترحات",
      "SUNDAY":"الأحد",
      "MONDAY":"الإثنين",
      "TEUSDAY":"الثلاثاء",
      "WEDNESDAY":"الأربعاء",
      "THURSDAY":"الخميس",
      "FRIDAY":"الجمعة",
      "SATURDAY":"السبت",
      "Male":"ذكر",
      "Female":"أنثى",
      "Qualification":"المؤهل الدراسي",
      "Where did you find us":"كيف تعرفت على المركز",
      "Job":"الإرتباط الوظيفي",
      "Where did you find us":"كيف تعرفت على المركز",
      "Memorized Juz'":"عدد الإجزاء التي تحفظها",
      "Biggner":"مبتدئ",
      "Expert":"خبير",
      "Excellent":"ممتاز",
      "Please Rate the student level":"الرجاء تقييم مستوى الطالب",
      "Suggestions":"المقترحات",
      "Capacity of Memorization":"مقدار الحفظ",
      "Group name":"اسم المجلس",
      "Lesson Date":"يوم الحصة",
      "Your qualification":"المؤهل الدراسي",
      "Which one are you?":"الرجاء اختيار النوع",
      "Select your Gender":"اختر النوع",
      "Registeration":"التسجيل",
      "Step":"المرحلة",
      "Your Full name":"الاسم كامل",
      "Counrty of Residance":"بلد الإقامة",
      "Your Job":"الإرتباط الوظيفي",
      "Where did you find us?":"كيف تعرفت على المركز ؟"


    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
