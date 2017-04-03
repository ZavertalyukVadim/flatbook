package flatbook.profile.util;

import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.util.Arrays;

public class FileValidator {

    public static boolean isImage(File file) {
        String extension = getExtension(file);

        return Arrays.stream(getEnumValues(ImageFormats.class)).anyMatch(s -> s.equals(extension));
    }

    private static String getExtension(File file) {
        String path = file.getPath();

        return FilenameUtils.getExtension(path);
    }

    private static String[] getEnumValues(Class<? extends Enum<?>> e) {
        return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }
}
