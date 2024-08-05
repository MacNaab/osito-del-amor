function Pagination({
  currentPage,
  totalPages,
  onChangePage,
  language,
}: {
  currentPage: number;
  totalPages: number;
  onChangePage: any;
  language: any;
}) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    const classActive =
      "flex h-10 items-center justify-center px-4 text-blue-700 border border-gray-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
    const classInactive =
      "flex h-10 items-center justify-center border border-gray-500 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => onChangePage(i)}
          className={currentPage === i ? classActive : classInactive}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  const precedent = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const suivant = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <section>
      <nav className="mx-auto text-center" aria-label="Page navigation example">
        <ul className="inline-flex h-10 cursor-pointer -space-x-px text-base">
          <li
            onClick={precedent}
            className="ml-0 flex h-10 items-center justify-center rounded-l-lg border border-gray-500 bg-gray-200 px-4 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {language.previous}
          </li>
          {renderPageNumbers()}
          <li
            onClick={suivant}
            className="flex h-10 items-center justify-center rounded-r-lg border border-gray-500 bg-gray-200 px-4 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {language.next}
          </li>
        </ul>
      </nav>
    </section>
  );
}
export default function Sample({
  totalPages,
  currentPage,
  setCurrentPage,
  language,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: any;
  language: any;
}) {
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Effectuer une requête API pour récupérer les données de la nouvelle page
  };

  return (
    <div>
      {/* Afficher les données de la page actuelle */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
        language={language}
      />
    </div>
  );
}
