package flatbook.profile.util;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.function.Predicate;

public class FileUtil {

    public static boolean isImage(String fileName) {
        String extension = getExtension(fileName);

        return Arrays.stream(getEnumValues(ImageFormats.class)).anyMatch((Predicate<String>) s -> {
            if (s.equals(extension)) {
                return true;
            }

            return false;
        });
    }

    public static byte[] multipartToBytes(MultipartFile multipart) throws IllegalStateException, IOException {
        String originalFileName = multipart.getOriginalFilename();

        String fileNameWithoutExtension = getFileNameWithoutExtension(originalFileName);
        String extension = getExtension(originalFileName);

        File tempFile = File.createTempFile(fileNameWithoutExtension, extension);
        multipart.transferTo(tempFile);

        Path path = tempFile.toPath();

        return Files.readAllBytes(path);
    }

    public static String getExtension(String fileName) {
        return FilenameUtils.getExtension(fileName);
    }

    public static String getFileNameWithoutExtension(String fileName) {
        return FilenameUtils.getBaseName(fileName);
    }

    private static String[] getEnumValues(Class<? extends Enum<?>> e) {
        return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }
}
