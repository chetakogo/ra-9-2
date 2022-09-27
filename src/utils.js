import { DateTime, Duration } from 'luxon'; // Работа со временем

  function formatDate (date) {
    const publicationDate = DateTime.fromMillis(date).setLocale('ru'); // Дата публикации
    const currentDate = DateTime.now().setLocale('ru'); // Текущее время
    // console.log(date, publicationDate)

    // Разница по времени (годы, дни, месяцы, часы, минуты)
    const diff = currentDate
      .diff(publicationDate, ['years', 'months', 'days', 'hours', 'minutes'])
      .toObject();

    // Округляем данные времени до целого числа
    for (const key in diff) {
      diff[key] = Math.floor(diff[key]);
    }

    const { years, months, days, hours, minutes } = diff;

    /**
     * Создает подпись в формате '2 дня назад'
     * @param {*} date - Объект содержащий один из ключей: years, months, days, hours, minutes
     * @returns - строка, прошедшее время со склонением
     */
    const getDateString = (diffDate) => {
      return `${Duration.fromObject(diffDate).toHuman()} назад`
    }

    let dateString = '';
    if (years > 0) {
      dateString = getDateString({years})
    } else if (months > 0) {
      dateString = getDateString({months})
    } else if (days >= 1) {
      dateString = getDateString({days})
    } else if (hours >= 1) {
      dateString = getDateString({hours})
    } else if (minutes !== 0) {
      dateString = getDateString({minutes})
    } else {
      dateString = 'Только что';
    }

    return dateString;
}

export default formatDate;